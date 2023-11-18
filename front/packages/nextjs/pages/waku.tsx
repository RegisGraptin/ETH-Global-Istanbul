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

  const parseTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the format as needed
  };

  // Choose a content topic
  const contentTopic = "/safety-first/1/alerting";

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

      setMessages((messages) => [...messages, messageObj]);

      console.log(messages);
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
        <section className="flex">

          <div style={{ height: '100vh', width: '50%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >

              {messages && messages.map((data, index) => (

                <AnyReactComponent
                  key={index}
                  lat={data.latitude}
                  lng={data.longitude}
                  text={data.event}
                />
              ))}



            </GoogleMapReact>
          </div>

          <div style={{ height: '100vh', width: '50%' }}>
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
                  onChange={(e) => setLatitude(e.target.value)}
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
                  onChange={(e) => setLongitude(e.target.value)}
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
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>


              <button
                onClick={() => {
                  sendMessage();
                }}
              >
                Send an alert
              </button>

            </div>

            <div>
              <h2>Show events</h2>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Latitude
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Longitude
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type of event
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {messages && messages.map((item, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {parseTimestampToDate(item.timestamp)}
                        </th>
                        <td className="px-6 py-4">
                          {item.latitude}
                        </td>
                        <td className="px-6 py-4">
                          {item.longitude}
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            {item.event}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Waku;
