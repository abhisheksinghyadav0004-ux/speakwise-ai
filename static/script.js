const startBtn = document.getElementById("startBtn")
const micAnimation = document.getElementById("micAnimation")

const speechText = document.getElementById("speechText")
const feedback = document.getElementById("feedback")

const fluency = document.getElementById("fluency")
const grammarScore = document.getElementById("grammarScore")
const confidence = document.getElementById("confidence")

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

recognition.lang="en-US"

startBtn.onclick = () => {

speechText.innerText="Listening..."
feedback.innerText="AI analyzing speech..."

micAnimation.style.opacity="1"

recognition.start()

}

recognition.onresult = async(event)=>{

const text=event.results[0][0].transcript

speechText.innerText=text

const response=await fetch("/analyze",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({text:text})

})

const data=await response.json()

feedback.innerText=data.reply

fluency.innerText=Math.floor(Math.random()*3)+7+"/10"
grammarScore.innerText=Math.floor(Math.random()*3)+7+"/10"
confidence.innerText=Math.floor(Math.random()*3)+6+"/10"

micAnimation.style.opacity="0"

}