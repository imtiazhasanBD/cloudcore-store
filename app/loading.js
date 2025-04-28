export default function Loading() {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80"
    >
      <div className="relative h-16 w-16">
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-700 opacity-75 animate-ping"></div>
        {/* Rotating border */}
        <div className="absolute inset-0 rounded-full border-4 border-solid border-green-700 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}