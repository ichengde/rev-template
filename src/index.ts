import frida, { type Session, type Script } from "frida";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import fs from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const procName = "";

function onMessage(message, data) {
	if (message.type === "send") {
		console.log(message.payload);
	} else if (message.type === "error") {
		console.error(message.stack);
	}
}

const injectScript: Script[] = [];
const injectSession: Session[] = [];
async function start() {
	const device = await frida.getLocalDevice();
	const processes = await device.enumerateProcesses();
	const cp = processes.find((p_) => procName === p_.name);

	const session = await frida.attach(cp.pid);
	injectSession.push(session);

	const scriptText = (
		await fs.readFile(path.join(__dirname, "script", "A.js"))
	).toString();

	const script = await session.createScript(scriptText);
	injectScript.push(script);

	script.message.connect(onMessage);

	await script.load();

	return script;
}

start();

const exitFunc = async () => {
	for (const p of injectScript) {
		p.unload();
	}

	for (const session of injectSession) {
		session.detach();
		console.log("detach");
	}
};

process.on("beforeExit", exitFunc);
process.on("uncaughtExceptionMonitor", exitFunc);
process.on("SIGINT", exitFunc);
