import { useState, useRef, useEffect } from "react";
import { Play, Pause, Upload, Mic, StopCircle } from "lucide-react";

const AudioRecorder = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // duration para archivos subidos
  const [duration, setDuration] = useState(0);
  // duración manual para grabaciones
  const [recordedDuration, setRecordedDuration] = useState(0);
  // Bandera para identificar si el archivo es grabado
  const [isRecorded, setIsRecorded] = useState(false);
  const [recordTime, setRecordTime] = useState(0);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordTimeRef = useRef(0);

  // Función para formatear el tiempo en mm:ss
  const formatTime = (time) => {
    if (!isFinite(time) || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Limpieza de la URL para evitar fugas
  useEffect(() => {
    return () => {
      if (audioFile) URL.revokeObjectURL(audioFile);
    };
  }, [audioFile]);

  // Cuando se cambia el archivo, forzamos cargar los metadatos (para archivos subidos)
  useEffect(() => {
    if (audioFile && audioRef.current && !isRecorded) {
      audioRef.current.load();
    }
  }, [audioFile, isRecorded]);

  // Actualiza el contador mientras se graba
  useEffect(() => {
    let interval;
    if (isRecording) {
      setRecordTime(0);
      recordTimeRef.current = 0;
      interval = setInterval(() => {
        setRecordTime((prev) => {
          const newVal = prev + 1;
          recordTimeRef.current = newVal;
          return newVal;
        });
      }, 1000);
    } else {
      setRecordTime(0);
      recordTimeRef.current = 0;
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (audioFile) URL.revokeObjectURL(audioFile);
      const objectURL = URL.createObjectURL(file);
      setAudioFile(objectURL);
      setIsPlaying(false);
      setCurrentTime(0);
      // Es un archivo subido, no grabado
      setIsRecorded(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startRecording = async () => {
    try {
      // Marcar que es grabación
      setIsRecorded(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        if (audioFile) URL.revokeObjectURL(audioFile);
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioFile(audioURL);
        setIsPlaying(false);
        setCurrentTime(0);
        // Establecer la duración manual basada en el tiempo grabado
        setRecordedDuration(recordTimeRef.current);
        // Detener todas las pistas del stream
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  // Actualiza el tiempo actual durante la reproducción
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Para archivos subidos, usa los metadatos para establecer la duración
  const handleLoadedMetadata = () => {
    if (audioRef.current && !isRecorded) {
      const loadedDuration = audioRef.current.duration;
      if (loadedDuration > 0 && !isNaN(loadedDuration)) {
        setDuration(loadedDuration);
      }
    }
  };

  // Para el slider, usamos la duración grabada o la del archivo
  const computedDuration = isRecorded ? recordedDuration : duration;

  const handleProgressChange = (event) => {
    if (audioRef.current) {
      const newTime = parseFloat(event.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg w-80">
      <label className="cursor-pointer flex items-center gap-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
        <Upload className="w-5 h-5" />
        <span>Subir audio</span>
        <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
      </label>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
      >
        {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
      {isRecording && (
        <div className="mt-2 text-red-600 font-medium">
          Grabando: {formatTime(recordTime)}
        </div>
      )}
      {audioFile && (
        <div className="mt-4 flex flex-col items-center w-full">
          <audio
            ref={audioRef}
            src={audioFile}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
          <button
            onClick={togglePlay}
            className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          {/* Línea de reproducción */}
          <div className="w-full mt-4">
            <input
              type="range"
              min="0"
              max={computedDuration || 0}
              value={currentTime}
              step="0.1"
              onChange={handleProgressChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(computedDuration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;















// import { useState, useRef } from "react";
// import { Play, Pause, Upload, Mic, StopCircle } from "lucide-react";

// const AudioRecorder = () => {
//   const [audioFile, setAudioFile] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const audioRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const objectURL = URL.createObjectURL(file);
//       setAudioFile(objectURL);
//     }
//   };

//   const togglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorderRef.current = mediaRecorder;
//     audioChunksRef.current = [];

//     mediaRecorder.ondataavailable = (event) => {
//       audioChunksRef.current.push(event.data);
//     };

//     mediaRecorder.onstop = () => {
//       const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//       const audioURL = URL.createObjectURL(audioBlob);
//       setAudioFile(audioURL);
//     };

//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg w-80">
//       <label className="cursor-pointer flex items-center gap-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
//         <Upload className="w-5 h-5" />
//         <span>Subir audio</span>
//         <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
//       </label>
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
//       >
//         {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
//       </button>
//       {audioFile && (
//         <div className="mt-4 flex flex-col items-center">
//           <audio ref={audioRef} src={audioFile} onEnded={() => setIsPlaying(false)} />
//           <button
//             onClick={togglePlay}
//             className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
//           >
//             {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;
