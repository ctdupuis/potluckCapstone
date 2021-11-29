
var padding = {top:20, right:50, bottom:0, left:0},
w = 700 - padding.left - padding.right,
h = 700 - padding.top  - padding.bottom,
r = Math.min(w, h)/2,
rotation = 0,
oldrotation = 0,
picked = 100000,
oldpick = [],
color = d3.scale.category20();

//randomNumbers = getRandomNumbers();

var data = [
        {"label":"Mac & Cheese",  "value":1,  "question":"What is Kraft known for?"}, // padding
        {"label":"Green Bean Casserole",  "value":2,  "question":"What dish do you put fried onion on top of?"}, //font-family
        {"label":"Spaghetti",  "value":3,  "question":"What dish is a Cajun class?"}, //color
        {"label":"Chicken Pot Pie",  "value":4,  "question":"What dish is a New Iberia 'must-have'?"}, //font-weight
        {"label":"Crawfish Ettoufee",  "value":5,  "question":"What do New Iberia Cajuns like to eat?"}, //font-size
        {"label":"Jambalaya",  "value":6,  "question":"What did Mike bring to Friendsgiving?"}, //background-color
        {"label":"Piggy in the Blanket",  "value":7,  "question":"What Jesus turned water into?"}, //nesting
        {"label":"Pepper Jelly Meatballs",  "value":8,  "question":"What is it when you smash bread up and pour lots of condensed milk on it?"}, //bottom
        {"label":"Spring rolls",  "value":9,  "question":"What are Richard's sausage and Trappey's beans together called?"}, //sans-serif
        {"label":"Ham & Cheese Sliders", "value":10, "question":"What is Cafe Du Monde known for?"}
];



var svg = d3.select('#chart')
.append("svg")
.data([data])
.attr("width",  w + padding.left + padding.right)
.attr("fill", "")
.attr("height", h + padding.top + padding.bottom);
var container = svg.append("g")
.attr("class", "chartholder")
.attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

var vis = container
.append("g");

var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
.data(pie)
.enter()
.append("g")
.attr("class", "slice");

arcs.append("path")
.attr("fill", function(d, i){ return color(i); })
.attr("d", function (d) { return arc(d); });
// add the text
arcs.append("text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle)/2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
})
.attr("text-anchor", "end")
.text( function(d, i) {
    return data[i].label;
});
container.on("click", spin);
function spin(d){

container.on("click", null);
//all slices have been seen, all done
console.log("OldPick: " + oldpick.length, "Data label: " + data.length);
if(oldpick.length == data.length){
    console.log("done");
    container.on("click", null);
    return;
}
var  ps       = 360/data.length,
     pieslice = Math.round(1440/data.length),
     rng      = Math.floor((Math.random() * 1440) + 360);
    
rotation = (Math.round(rng / ps) * ps);

picked = Math.round(data.length - (rotation % 360)/ps);
picked = picked >= data.length ? (picked % data.length) : picked;
if(oldpick.indexOf(picked) !== -1){
    d3.select(this).call(spin);
    return;
} else {
    oldpick.push(picked);
}
rotation += 90 - Math.round(ps/2);
vis.transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function(){
        //mark question as seen
        d3.select(".slice:nth-child(" + (picked + 1) + ") path")
            
        //populate question
        d3.select("#question h1")
            .text(data[picked].question);
        oldrotation = rotation;
  
        /* Get the result value from object "data" */
        console.log(data[picked].label)
  
        /* Comment the below line for restrict spin to sngle time */
        container.on("click", spin);
    });
}
//make arrow
svg.append("g")
.attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
.append("path")
.attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
.style({"fill-opacity=.8;":""});



//draw spin circle
container.append("circle")
.attr("cx", 0)
.attr("cy", 0)
.attr("r", 60)
.style({"fill":"white","cursor":"pointer"});
//spin text
container.append("text")
.attr("x", 0)
.attr("y", 15)
.attr("text-anchor", "middle")
.text("SPIN")
.style({"font-weight":"bold", "font-size":"30px"});


function rotTween(to) {
var i = d3.interpolate(oldrotation % 360, rotation);
return function(t) {
return "rotate(" + i(t) + ")";
};
}











const form = document.querySelector('#rsvp')
const firstNameInput = document.querySelector('#first-name')
const lastNameInput = document.querySelector('#last-name')
const phoneInput = document.querySelector('#phone-number')
const dishSelectedInput = document.querySelector('#dish-selected')

function handleSubmit(e) {
e.preventDefault()

if(firstNameInput.value < 1){
alert('You must enter your first name.')
return
}

let userRSVP = document.querySelector('input[class="submit"]:clicked').value
let body = {
firstName : firstNameInput.value,
lastName : lastNameInput.value,
phoneNumber : phoneInput.value,
dishSelected : dishSelectedInput.value

}
axios.post('http://localhost:4000/guests', body)
.then(() => {
firstNameInput.value= ''
lastNameInput.value = ''
phoneInput.value = ''
dishSelectedInput.value = '',
document.querySelector('#submit') = clicked
getGuests()
})
}
function getGuests() {
axios.get('http://localhost:4000/guests') 
.then(res => {
const guest = res.data[0]

const {
    first_name: firstName, 
    last_name: lastName, 
    phone_number: phoneNumber, 
    email, 
    dish_selected: dishSelected 
    } = guest

    firstNameInput.value = firstName
    lastNameInput.value = lastName
    phoneInput.value = phoneNumber
    dishSelectedInput.value = dishSelected
    
    })

 


}




form.addEventListener('submit', handleSubmit)  

getGuests()




