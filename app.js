const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// app.get('/greetings', (req, res) => {
//   //1. get values from the request
//   const name = req.query.name;
//   const race = req.query.race;
//
//   //2. validate the values
//   if(!name) {
//     //3. name was not provided
//     return res.status(400).send('Please provide a name');
//   }
//
//   if(!race) {
//     //3. race was not provided
//     return res.status(400).send('Please provide a race');
//   }
//
//   //4. and 5. both name and race are valid so do the processing.
//   const greeting = `Well, hello ${name} the ${race}, welcome to our kingdom.`;
//
//   //6. send the response
//   res.send(greeting);
// });

app.get('/sum', (req, res) => {
  const {a, b} = req.query;

  // Validation - a and b are required and should be numbers
  if(!a) {
    return res
          .status(400)
          .send('a is required');
  }

  if(!b) {
    return res
          .status(400)
          .send('b is required');
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if(Number.isNaN(numA)) {
    return res
          .status(400)
          .send('a must be a number');
  }

  if(Number.isNaN(numB)) {
    return res
          .status(400)
          .send('b must be a number');
  }

  // validation passed so perform the task
  const c = numA + numB;

  // format the response string
  const responseString = `The sum of ${numA} and ${numB} is ${c}`;

  // send the response
  res
    .status(200)
    .send(responseString);
});

app.get('/cipher',(req,res) => {
  const {text, shift} = req.query;
  var caesarShift = function(str, amount) {
	// Make an output variable
	var output = '';
	// Go through each character
	for (var i = 0; i < text.length; i ++) {
		// Get the character we'll be appending
		var c = text[i];
		// If it's a letter...
		if (c.match(/[a-z]/i)) {
			// Get its code
			var code = text.charCodeAt(i);
      let converted_shift = parseInt(shift)
      let total = converted_shift + code
			// Uppercase letters
  		if ((code >= 65) && (code <= 90)){
        if (total > 90){
          let new_total = total % 90
          c = String.fromCharCode(65 + new_total);
        } else {
          c = String.fromCharCode(code + converted_shift);
        }
      }

			// Lowercase letters
			else if ((code >= 97) && (code <= 122)){
        if (total > 122){
          let new_total = (total % 122)
          c = String.fromCharCode(97 + new_total);
        } else {
				c = String.fromCharCode(code + converted_shift);
        }
		}
		// Append
		output += c;
	}
  };
  return output
}
   return res
  .send(caesarShift(text,shift))
});

app.get('/lotto',(req,res) => {
  const numbers = req.query;
  const numbers_Array = numbers.numbers
  let random_array = Array.from({length: 6}, () => Math.floor(Math.random() * 20));
  let matches = 0
  let message = `Your number selection is ${numbers_Array}, the winning numbers are ${random_array}. `
  console.log(random_array)
  console.log(numbers_Array)

    for(let i=0;i<numbers_Array.length;i++){
      if (numbers_Array[i] == random_array[i]){
        matches ++
      }

    }
    if(matches < 4){
      message += "Sorry, you lose"
    } else if (matches == 4) {
      message += "Sorry, you lose"
    } else if (matches == 5) {
      message += "Congratulations! You win $100!"
    } else if (matches == 6) {
      message += "Wow! Unbelievable! You could have won the mega millions!"
    }

  return res
  .send(message)

})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
