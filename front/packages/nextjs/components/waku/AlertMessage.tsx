import protobuf from "protobufjs";

// Create a message structure using Protobuf
export const AlertMessage = new protobuf.Type("AlertMessage")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("latitude", 2, "string"))
    .add(new protobuf.Field("longitude", 3, "string"))
    .add(new protobuf.Field("event", 4, "string"));