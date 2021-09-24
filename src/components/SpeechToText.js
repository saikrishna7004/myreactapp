import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useRef, useState } from "react";
import "../App.css";

function SpeechToText() {

    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const [userLang, setUserLang] = useState("en-IN");
    const langSelectOption = useRef(null)
    const trans = useRef(null)

    const listLang = [
        ["India", "en-IN"],
        ["South Africa", "af-ZA"],
        ["Algeria", "ar-DZ"],
        ["Bahrain", "ar-BH"],
        ["Egypt", "ar-EG"],
        ["Israel", "ar-IL"],
        ["Iraq", "ar-IQ"],
        ["Jordan", "ar-JO"],
        ["Kuwait", "ar-KW"],
        ["Lebanon", "ar-LB"],
        ["Morocco", "ar-MA"],
        ["Oman", "ar-OM"],
        ["Palestinian Territory", "ar-PS"],
        ["Qatar", "ar-QA"],
        ["Saudi Arabia", "ar-SA"],
        ["Tunisia", "ar-TN"],
        ["UAE", "ar-AE"],
        ["Spain", "eu-ES"],
        ["Bulgaria", "bg-BG"],
        ["Spain", "ca-ES"],
        ["China (Simp.)", "cmn-Hans-CN"],
        ["Hong Kong SAR (Trad.)", "cmn-Hans-HK"],
        ["Taiwan (Trad.)", "cmn-Hant-TW"],
        ["Hong Kong", "yue-Hant-HK"],
        ["Croatia", "hr_HR"],
        ["Czech Republic", "cs-CZ"],
        ["Denmark", "da-DK"],
        ["Australia", "en-AU"],
        ["Canada", "en-CA"],
        ["Ireland", "en-IE"],
        ["New Zealand", "en-NZ"],
        ["Philippines", "en-PH"],
        ["South Africa", "en-ZA"],
        ["United Kingdom", "en-GB"],
        ["United States", "en-US"],
        ["Iran", "fa-IR"],
        ["France", "fr-FR"],
        ["Philippines", "fil-PH"],
        ["Spain", "gl-ES"],
        ["Germany", "de-DE"],
        ["Greece", "el-GR"],
        ["Finland", "fi-FI"],
        ["Israel", "he-IL"],
        ["India", "hi-IN"],
        ["Hungary", "hu-HU"],
        ["Indonesia", "id-ID"],
        ["Iceland", "is-IS"],
        ["Italy", "it-IT"],
        ["Switzerland", "it-CH"],
        ["Japan", "ja-JP"],
        ["Korea", "ko-KR"],
        ["Lithuania", "lt-LT"],
        ["Malaysia", "ms-MY"],
        ["Netherlands", "nl-NL"],
        ["Norway", "nb-NO"],
        ["Poland", "pl-PL"],
        ["Brazil", "pt-BR"],
        ["Portugal", "pt-PT"],
        ["Romania", "ro-RO"],
        ["Russia", "ru-RU"],
        ["Serbia", "sr-RS"],
        ["Slovakia", "sk-SK"],
        ["Slovenia", "sl-SI"],
        ["Argentina", "es-AR"],
        ["Bolivia", "es-BO"],
        ["Chile", "es-CL"],
        ["Colombia", "es-CO"],
        ["Costa Rica", "es-CR"],
        ["Dominican Republic", "es-DO"],
        ["Ecuador", "es-EC"],
        ["El Salvador", "es-SV"],
        ["Guatemala", "es-GT"],
        ["Honduras", "es-HN"],
        ["México", "es-MX"],
        ["Nicaragua", "es-NI"],
        ["Panamá", "es-PA"],
        ["Paraguay", "es-PY"],
        ["Perú", "es-PE"],
        ["Puerto Rico", "es-PR"],
        ["Spain", "es-ES"],
        ["Uruguay", "es-UY"],
        ["United States", "es-US"],
        ["Venezuela", "es-VE"],
        ["Sweden", "sv-SE"],
        ["Thailand", "th-TH"],
        ["Turkey", "tr-TR"],
        ["Ukraine", "uk-UA"],
        ["Viet Nam", "vi-VN"],
        ["South Africa", "zu-ZA"]
    ]

    const microphoneRef = useRef(null);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="mircophone-container">
                Browser is not Support Speech Recognition.
            </div>
        );
    }

    const handleListing = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
            language: userLang
        });
    }

    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    }

    const handleReset = () => {
        stopHandle();
        resetTranscript();
    }

    const handleMic = () => {
        isListening ? stopHandle() : handleListing()
    }

    const handleSelectLang = ()=>{
        setUserLang(langSelectOption.current.value)
    }

    const handleCopy = ()=>{
        navigator.clipboard.writeText(trans.current.innerHTML);
    }

    const handleSave = ()=>{
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(trans.current.innerHTML));
        element.setAttribute('download', prompt("Enter File Name")+".txt");
        element.style.display = 'none'; document.body.appendChild(element);
        element.click(); 
        document.body.removeChild(element);
    }

    return (
        <div className="container">
            <div className="microphone-wrapper">
                <div className="mircophone-container my-3">
                    <button className="microphone-icon-container btn" ref={microphoneRef} onClick={handleMic} style={{ display: "inline", position: "relative", cursor: "pointer", color: "transparent" }}>
                        <img src={process.env.PUBLIC_URL + "/mic.png"} alt={!isListening?"Mic Off. Click to Start":"Mic Recording. Click to Stop"} className="microphone-icon" height="50" width="30" />
                        {isListening && (
                            <svg height="10" width="10" className="blinking">
                                <circle cx="5" cy="5" r="5" fill="red" />
                            </svg>
                        )}
                    </button>
                    <div className="microphone-status my-3">
                        {isListening ? "Listening........." : "Click to start Listening"}
                    </div>
                    <div className="my-3">
                        <select className="form-select w-auto" name="lang" id="lang" onChange={handleSelectLang} ref={langSelectOption}>
                            {
                                listLang.map(function (lang, i) {
                                    return <option key={i} value={lang[1]}>{lang[0]} {lang[1]}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {transcript && (
                    <div className="microphone-result-container my-3">
                        <p className="my-2">Transcript</p>
                        <div className="microphone-result-text my-3 border p-2" id="transcript" ref={trans}>{transcript}</div>
                        {/* <textarea className="form-control my-2" name="result" id="result" value={transcript}></textarea> */}
                        <button className="microphone-reset btn btn-primary m-2" onClick={handleReset}>
                            Reset Transcript
                        </button>
                        <button className="microphone-reset btn btn-primary m-2" onClick={handleCopy}>
                            Copy Transcript
                        </button>
                        <button className="microphone-reset btn btn-primary m-2" onClick={handleSave}>
                            Save as Text File
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SpeechToText
