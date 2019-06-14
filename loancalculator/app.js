//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //HideResults
        document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 1000);
    e.preventDefault()
});

//Calculate Results

function calculateResults(){
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;   
    //Compute monthly payment
    const x= Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly  = (principal * x * calculatedInterest) / (x-1);
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results and hide loader
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }

    else {
        showError('Please check your numbers...')
    }

}


//Show error
function showError(error){

    //HideResults
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'none';

    //Create div
    const errorDiv = document.createElement('div');
    //Add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Get elements
    const cards = document.querySelector('.card');
    const heading =document.querySelector('.heading');

    //insert error above heading
    cards.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//clear error
function clearError(){

    document.querySelector('.alert').remove();
}