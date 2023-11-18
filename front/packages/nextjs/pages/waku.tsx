import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

import { LightNode, createLightNode } from "@waku/sdk";
import { waitForRemotePeer } from "@waku/sdk";

import { createEncoder, createDecoder } from "@waku/sdk";
import { AlertMessage } from "~~/components/waku/AlertMessage";
import { useEffect, useMemo, useState } from "react";
import { Reader } from "protobufjs";




import React from "react";
import GoogleMapReact from 'google-map-react';



const AnyReactComponent = ({ text }) => <div>{text}</div>;



const Waku: NextPage = () => {

  const [node, setNode] = useState<LightNode>();
  const [messages, setMessages] = useState([]);


  const [latitude, setLatitude] = useState<string>("10.99835602");
  const [longitude, setLongitude] = useState<string>("77.01502627");
  const [event, setEvent] = useState<string>("Earthquake");

  let subscribed = false;

  // Choose a content topic
  const contentTopic = "/light-guide/1/message/proto";

  async function createLightClient() {
    // Create and start a Light Node
    const node = await createLightNode({ defaultBootstrap: true });
    await node.start();

    // Wait for a successful peer connection
    await waitForRemotePeer(node);

    setNode(node);
  }

  async function sendMessage() {

    // Create a message encoder and decoder
    const encoder = createEncoder({ contentTopic });

    // Create a new message object
    const protoMessage = AlertMessage.create({
      timestamp: Date.now(),
      latitude: latitude,
      longitude: longitude,
      event: event
    });

    // Serialise the message using Protobuf
    const serialisedMessage = AlertMessage.encode(protoMessage).finish();

    // Send the message using Light Push
    await node?.lightPush.send(encoder, {
      payload: serialisedMessage,
    });

    console.log("Sended message");
    console.log(protoMessage);
  }

  useEffect(() => {
    createLightClient();
  }, []);

  async function getMessages() {
    
    subscribed = true;

    const decoder = createDecoder(contentTopic);

    // Create the callback function
    const callback = (alertMessage: { payload: Uint8Array | Reader; }) => {
      // Check if there is a payload on the message
      if (!alertMessage.payload) return;
      // Render the messageObj as desired in your application
      const messageObj = AlertMessage.decode(alertMessage.payload);

      console.log("Received message:");
      console.log(messageObj);

      messages.push(messageObj);
    };

    // Create a filter subscription
    const subscription = await node?.filter.createSubscription();

    // Subscribe to content topics and process new messages
    await subscription?.subscribe([decoder], callback);
  }

  if (!subscribed) {
    getMessages();
  }

  

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    <>
      <MetaHeader />
      <div>
        <h2>Chat</h2>

          <section className="flex">

        <div style={{ height: '100vh', width: '50%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            
            {messages.map((data, i) => {
              <AnyReactComponent
                lat={data.latitude}
                lng={data.longitude}
                text={data.event}
              />
            })}

          

          </GoogleMapReact>
        </div>

          <div>
            <h2>Add new Alert</h2>

            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude</label>
                  <input 
                    type="text" id="first_name" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="John" 
                    required 
                    value={latitude}
                  />
              </div>

              <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude</label>
                  <input 
                    type="text" id="first_name" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="John" 
                    required 
                    value={longitude}
                  />
              </div>


              <div>
                  <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event</label>
                  <input 
                    type="text" id="first_name" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="John" 
                    required 
                    value={event}
                  />
              </div>


                <button
                  onClick={() => {
                    sendMessage();
                  }}
                >
                  Send message
                </button>


            </div>
            

          </div>

          </section>

      </div>
    </>
  );
};

export default Waku;
