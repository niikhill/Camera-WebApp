let constraints = {
    video: true,
    audio: true
};
let timerEl = document.querySelector(".timing");
let recordBtn = document.querySelector("#recorder")
let clickBtn = document.querySelector("#clickbtn")
let vidElement = document.querySelector("#video-player");
let mediaRecorder;
let recordState = false;
let buffer = [];
let clearObj = {};


(async () => {
    try {
        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        vidElement.srcObject = mediaStream;
        mediaRecorder = await new MediaRecorder(mediaStream);

        mediaRecorder.addEventListener("dataavailable", (e) => {
            buffer.push(e.data);
        })
        mediaRecorder.addEventListener("stop", (e) => {
            //mine type
            let blob = new Blob(buffer, {
                type: "video/mp4"
            });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            let file_name = getFormattedTime();
            a.download = `niikhill.com_${file_name}.mp4`
            a.href = url;
            a.click();
            buffer = [];
        })
    } catch (err) {
        console.log(err);
    }

})();


recordBtn.addEventListener("click", () => {
    if (!mediaRecorder) {
        alert("Enable Permissions")
    }
    if (recordState == false) {
        mediaRecorder.start();
        recordState = true;
        recordBtn.classList.remove("notRec");
        recordBtn.classList.add("rec");
        startCounting();
        // timerEl.classList.add("timing-active");
    } else {
        mediaRecorder.stop();
        recordState = false;
        recordBtn.classList.remove("rec");
        recordBtn.classList.add("notRec")
        stopCounting();
        // timerEl.classList.remove("timing-active")
    }
});

clickBtn.addEventListener("click", (e) => {
    //create canvas element 

    let canvas = document.createElement("canvas");
    canvas.width = vidElement.videoWidth;
    canvas.height = vidElement.videoHeight;
    let tool = canvas.getContext("2d");
    tool.drawImage(vidElement, 0, 0);
    clickBtn.classList.add("singlePulse");
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    let file_name = getFormattedTime();
    a.download = `niikhill.com_${file_name}.png`
    a.href = url;
    a.click();
    setTimeout(() => {
        clickBtn.classList.remove("singlePulse");
    }, 1000)

})



function getFormattedTime() {
    let today = new Date();
    let y = today.getFullYear();
    // JavaScript months are 0-based.
    let m = today.getMonth() + 1;
    let d = today.getDate();
    let h = today.getHours();
    let mi = today.getMinutes();
    let s = today.getSeconds();
    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
}


function startCounting() {
    timerEl.classList.add("timing-active")
    let timeCount = 0;
    clearObj = setInterval(() => {
        let seconds = (timeCount % 60) < 10 ? `0${timeCount%60}` : `${timeCount%60}`
        let minutes = (timeCount / 60) < 10 ? `0${Number.parseInt(timeCount/60)}` : `${Number.parseInt(timeCount/60)}`
        let hours = (timeCount / 3600) < 10 ? `0${Number.parseInt(timeCount/3600)}` : `${Number.parseInt(timeCount/3600)}`
        timerEl.innerText = `${hours}:${minutes}:${seconds}`;
        timeCount++;
    }, 1000)
}

function stopCounting() {
    timerEl.classList.remove("timing-active")
    timerEl.innerText = "00:00:00";
    clearInterval(clearObj);
}



















// navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then((mediaStream) => {
//         mediaRecorder = new MediaRecorder(mediaStream);
//         mediaRecorder.addEventListener("dataavailable", (e) => {
//             buffer.push(e.data);
//         })
//         mediaRecorder.addEventListener("stop", (e) => {
//             //mine type
//             let blob = new Blob(buffer, {
//                 type: "video/mp4"
//             });
//             const url = window.URL.createObjectURL(blob);
//             let a = document.createElement("a");
//             a.download = "file.mp4"
//             a.href = url;
//             a.click();
//         })
//     }).catch((err) => {
//         console.log(err);
//     })

;