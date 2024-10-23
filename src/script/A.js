const mdus = Process.enumerateModules();

const OutputDebugStringAddress = Module.getExportByName(
	"Kernel32.dll",
	"OutputDebugStringW",
);

const GetLastErrorAddress = Module.getExportByName(
	"Kernel32.dll",
	"GetLastError",
);
