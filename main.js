let constraints = {
    video: true,
    audio: true
};
let allFilter = document.querySelectorAll(".filter");
let timerEl = document.querySelector(".timing");
let recordBtn = document.querySelector("#recorder")
let clickBtn = document.querySelector("#clickbtn")
let vidElement = document.querySelector("#video-player");
let video_container = document.querySelector(".video_container")
let uiFilter = document.querySelector(".ui-filter")
let zoomIn = document.getElementById("plus-container");
let zoomOut = document.getElementById("minus-container");
let mediaRecorder;
let recordState = false;
let buffer = [];
let clearObj = {};
let currentFilter = "";
let zoomLevel = 1;

window.onload = function () {
    vidElement.muted = "muted";
};

(async () => {
    try {
        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        vidElement.srcObject = mediaStream;
        let options = {
            mimeType: "video/webm; codecs=vp9"
        };
        mediaRecorder = await new MediaRecorder(mediaStream, options);

        mediaRecorder.addEventListener("dataavailable", (e) => {
            buffer.push(e.data);
        })
        mediaRecorder.addEventListener("stop", (e) => {
            //mine type
            let blob = new Blob(buffer, {
                type: "video/webm"
            });
            // let duration = Date.now() - startTime;
            // let fixedBlob = ysFixWebmDuration(blob, duration)
            // const url = window.URL.createObjectURL(blob);
            // let a = document.createElement("a");
            // let file_name = getFormattedTime();
            // a.download = `niikhill.com_${file_name}.mkv`
            // a.href = url;
            // a.click();
            addMediaToDb(blob,"video");
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
    let tool = canvas.getContext("2d");
    canvas.width = vidElement.videoWidth;
    canvas.height = vidElement.videoHeight;
    tool.scale(zoomLevel, zoomLevel);
    let x = (canvas.width / zoomLevel - canvas.width) / 2;
    let y = (canvas.height / zoomLevel - canvas.height) / 2
    if (currentFilter) {
        tool.fillStyle = currentFilter;
        tool.fillRect(0, 0, canvas.width, canvas.height);
    }
    tool.drawImage(vidElement, x, y); 
    let url = canvas.toDataURL();
    addMediaToDb(url,"images");
    clickBtn.classList.add("singlePulse");
    // let a = document.createElement("a");
    // let file_name = getFormattedTime();
    // a.download = `niikhill.com_${file_name}.png`
    // a.href = url;
    // a.click();
    // a.remove();
    // canvas.remove();
    setTimeout(() => {
        clickBtn.classList.remove("singlePulse");
    }, 1000)

})



//allFilter

for (let i = 0; i < allFilter.length; i++) {
    allFilter[i].addEventListener("click", (e) => {
        //Add filter to UI
        let color = allFilter[i].style.backgroundColor
        if (color) {
            uiFilter.classList.add("ui-filter-active");
            uiFilter.style.backgroundColor = color;
            currentFilter = color;
        } else {
            uiFilter.classList.remove("ui-filter-active");
            uiFilter.style.backgroundColor = "";
            currentFilter = "";
        }
    })
}



//zoom 

zoomIn.addEventListener("click", (e) => {
    if (zoomLevel < 3) {
        zoomLevel += 0.2;
        vidElement.style.transform = `scale(${zoomLevel}) scaleX(-1)`;
    }
})
zoomOut.addEventListener("click", () => {
    if (zoomLevel > 1) {
        zoomLevel -= 0.2;
        vidElement.style.transform = `scale(${zoomLevel}) scaleX(-1)`;
    }
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