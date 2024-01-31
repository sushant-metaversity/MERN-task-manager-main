import { io } from "socket.io-client"
import { ServerEvents } from "../../events";
import toast from "react-hot-toast";

export const socket = io("http://localhost:4001", {  extraHeaders: { token: localStorage.getItem("token") } })
socket?.on(ServerEvents.ERROR, (args) => { toast.error(args.message) })