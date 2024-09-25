import { uploadFile } from "@/api/uploadFile";
import { Button } from "@/components/ui/button";
import { TYPE_MESSAGE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { HubServices } from "@/services/HubServices";
import { useAppStore } from "@/store";
import { formatTimeRecord } from "@/utils/functionHelper";
import { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import WaveSurfer from "wavesurfer.js";
const CaptureAudio = ({ onClose }) => {
  const { user, roomSelected } = useAppStore();
  const toast = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordAudio, setRecordAudio] = useState(null);
  const [waveForm, setWaveForm] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlayBackTime, setCurrentPlayBackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlayingRecord, setIsPlayingRecord] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState(false);
  const audioRef = useRef(null);
  const mediaRecordRef = useRef(null);
  const waveFormRef = useRef(null);
  const handlePlayAudioRecord = () => {
    if (recordAudio) {
      waveForm.stop();
      waveForm.play();
      recordAudio.play();
      setIsPlayingRecord(true);
    }
  };
  const handlePauseAudioRecord = () => {
    waveForm.stop();
    recordAudio.pause();
    setIsPlayingRecord(false);
  };
  const handleStopRecording = () => {
    if (mediaRecordRef.current && isRecording) {
      mediaRecordRef.current.stop();
      setIsRecording(false);
      waveForm.stop();
      const audioChunks = [];
      mediaRecordRef.current.addEventListener("dataavailable", (e) => {
        audioChunks.push(e.data);
      });
      mediaRecordRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "audio.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };
  const handleStartRecording = () => {
    setTotalDuration(0);
    setCurrentPlayBackTime(0);
    setRecordingDuration(0);
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecordRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codes=opus" });
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          setRecordAudio(audio);
          waveForm.load(url);
        };
        mediaRecorder.start();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendRecord = async () => {
    const formData = new FormData();
    formData.append("file", renderedAudio);
    try {
      const upLoadFileResult = await uploadFile.upload({
        formData,
        type: TYPE_MESSAGE.AUDIO,
      });

      const data = {
        createBy: user.id,
        roomChatId: roomSelected.id,
        content: upLoadFileResult?.value?.url,
        type: TYPE_MESSAGE.AUDIO,
        IsGroup: roomSelected.isGroup,
      };
      HubServices.sendMessage(data);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Up load image failed !",
      });
    }
  };
  useEffect(() => {
    if (waveForm) handleStartRecording();
  }, [waveForm]);
  useEffect(() => {
    if (recordAudio) {
      const updatePlayBackTime = () => {
        setCurrentPlayBackTime(recordAudio.currentTime);
      };
      recordAudio.addEventListener("timeupdate", updatePlayBackTime);
      return () => {
        recordAudio.removeEventListener("timeupdate", updatePlayBackTime);
      };
    }
  }, [recordAudio]);
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => {
          return prev + 1;
        });
        setTotalDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 20,
      responsive: true,
    });
    setWaveForm(waveSurfer);
    waveSurfer.on("finish", () => {
      setIsPlayingRecord(false);
    });
    return () => {
      waveSurfer.destroy();
    };
  }, []);

  return (
    <div className="flex-1 flex  rounded-md items-center justify-end gap-5 p-4 bg-[#2a2d33]">
      <div className="mx-4 text-white flex gap-3 items-center drop-shadow-lg bg-black rounded-xl p-2">
        {isRecording ? (
          <>
            <div className="text-red-500 animate-pulse  text-center rounded-xl ">
              Recording... <span>{formatTimeRecord(recordingDuration)}</span>
            </div>
          </>
        ) : (
          <div>
            {recordAudio && (
              <>
                {!isPlayingRecord ? (
                  <FaPlay
                    onClick={handlePlayAudioRecord}
                    className="cursor-pointer"
                  />
                ) : (
                  <FaStop
                    onClick={handlePauseAudioRecord}
                    className="cursor-pointer"
                  />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-60" hidden={isRecording} ref={waveFormRef} />
        {recordAudio && isPlayingRecord && (
          <span>{formatTimeRecord(currentPlayBackTime)}</span>
        )}
        {recordAudio && !isPlayingRecord && (
          <span>{formatTimeRecord(totalDuration)}</span>
        )}
        <audio ref={audioRef} src={recordAudio} controls hidden />
      </div>
      <div>
        {!isRecording ? (
          <FaMicrophone
            className="text-red-500 cursor-pointer"
            onClick={handleStartRecording}
          />
        ) : (
          <FaPauseCircle
            className="text-red-500 cursor-pointer"
            onClick={handleStopRecording}
          />
        )}
      </div>
      <Button onClick={onClose}>
        <FaTrash color="white" />
      </Button>
      {!isRecording && recordAudio && (
        <Button
          className="bg-[#8417ff] rounded flex items-center justify-center  focus:text-white duration-300 transition-all hover:bg-[#741bda]"
          onClick={sendRecord}
        >
          <IoSend />
        </Button>
      )}
    </div>
  );
};

export default CaptureAudio;
