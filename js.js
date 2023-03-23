

function startClassification()
{
  navigator.mediaDevices.getUserMedia({ audio: true});
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/DVAqMhtW2/model.json', modelReady);
    
}



Webcam.set({
  width:350,
  height:300,
  image_format:'png',
  png_quality:90,
});

camera = document.getElementById("camera");

Webcam.attach('#camera');
console.log("ml5 version", ml5.version)
function take_snapshot()
{
  Webcam.snap(function(data_uri))

  {
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    
  }

}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {

  if (error) {
      console.erorr(error);
  }
  else {
      console.log(results);
      document.getElementById("result_emotion_name").innerHTML = results[0].label;
      document.getElementById("result_emotion_name2").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;
speak();
if(results[0].label == "ThumbUp")
{
  document.getElementById("update_emoji").innerHTML = "&#128077;"
}

if(results[0].label == "ThumbDown")
{
  document.getElementById("update_emoji").innerHTML = "&#128078;"
}

if(results[0].label == "Stop")
{
  document.getElementById("update_emoji").innerHTML = "&#128400;"
}


if(results[1].label == "happy")
{
  document.getElementById("update_emoji2").innerHTML = "&#128077;"
}

if(results[1].label == "sad")
{
  document.getElementById("update_emoji2").innerHTML = "&#128078"
}

if(results[1].label == "Angry")
{
  document.getElementById("update_emoji2").innerHTML = "&#128400;"
}







  }
}

function speak()  {

  var synth = window.SpeechSynthesis;
  speak_data_1= "The first prediction is" + prediction_1;
  speak_data_2 = "The second prediction id" + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
  utterThis.rate=0.7;
  synth.speak(utterThis);
}


