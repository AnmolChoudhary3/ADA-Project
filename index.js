function max(a, b){
    if(a > b){
        return a;
    }
    else{
        return b;
    }
}


function displayDpOntoHTML(dp, n, capacity){    
    
    let parent = document.getElementById("tableDiv");
    if(document.getElementById("table")){
        parent.style.opacity = 0;
        setTimeout(function(){
            parent.removeChild(document.getElementById("table"));
        }, 1000)
    }
    
    let table = document.createElement("table");
    for(let i = 0; i < n+1; i++){
        let row = document.createElement("tr");
        for(let j = 0; j < capacity+1; j++){
            let cell = document.createElement("td");
            let data = document.createTextNode(dp[i][j]);
            cell.appendChild(data);
            cell.classList.add("hidden");
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    table.id = "table";
    setTimeout(function(){
        parent.appendChild(table);
        parent.style.opacity = 1;
    }, 1000)
}


function knapsack(n, weights, values, capacity){
    let dp = new Array(n+1);
    for(let i = 0; i < n+1; i++){
        dp[i] = new Array(capacity+1);
        dp[i].fill(0);
    }
    for(let i = 1; i < n+1; i++){
        for(let j = 1; j < capacity+1; j++){
            if(weights[i-1] <= j){
                dp[i][j] = max(dp[i-1][j], values[i-1] + dp[i-1][j-weights[i-1]]);
            }
            else{
                dp[i][j] = dp[i-1][j];
            }
        }
    }

    displayDpOntoHTML(dp, n, capacity);
    getItems(capacity, dp[n][capacity], dp, values, weights, n)
    return dp[n][capacity];
}

function validate(n, weights, values, capacity){
    if(n && weights && values && capacity){
        return true;
    }
    return false;
}

function getAnswer(){
    let n = document.getElementById("items").value;
    let weights = document.getElementById("weight").value;
    let values = document.getElementById("values").value;
    let capacity = document.getElementById("capacity").value;

    if(validate(n, weights, values, capacity)){
        n = parseInt(n);
        capacity = parseInt(capacity);
        weights = weights.split(" ");
        for(let i = 0; i < n; i++){
            weights[i] = parseInt(weights[i]);
        }
        values = values.split(" ");
        for(let i = 0; i < n; i++){
            values[i] = parseInt(values[i]);
        }
        let result = knapsack(n, weights, values, capacity);
    
        let ans = document.getElementById("res");
        ans.value = result;
        setTimeout(function(){animate(n, capacity, weights)},1000);
       
    }
    else{
        let ans = document.getElementById("res");
        ans.value = "Please enter all the fields"
       
    }
}

function animate(n, capacity, weights){

    let table = document.getElementById("table");
    let animationSpeed = document.getElementById("animationSpeed").value;
    animationSpeed = parseInt(animationSpeed);

    // making first row visible
    for(let i=0;i<n+1;i++){
        let curcell = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
        curcell.classList.remove("hidden");

    }

    // making first column visible
    for(let j=0;j<capacity+1;j++){
        let curcell = table.getElementsByTagName("tr")[0].getElementsByTagName("td")[j];
        curcell.classList.remove("hidden");

    }
    
    
    for(let i=1;i<n+1;i++)
    {
        for(let j=1;j<capacity+1;j++)
        {
            if(weights[i-1] <= j){
                let curcell = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
                let cell1 = table.getElementsByTagName("tr")[i-1].getElementsByTagName("td")[j];
                let cell2 = table.getElementsByTagName("tr")[i-1].getElementsByTagName("td")[j-weights[i-1]];
                setTimeout(() =>{
                    curcell.classList.add("bgcurrent");
                    cell1.classList.add("bgmax");
                    cell2.classList.add("bgmax");
                    curcell.classList.remove("hidden");
                }, (animationSpeed*(capacity+1)*(i-1))+animationSpeed*(j-1));
    
                setTimeout(() =>{
                    curcell.classList.remove("bgcurrent");
                    cell1.classList.remove("bgmax");
                    cell2.classList.remove("bgmax");
                }, (animationSpeed*(capacity+1)*(i-1))+ animationSpeed*(j-1) + animationSpeed);
            }
            else{
                let curcell = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
                let cell1 = table.getElementsByTagName("tr")[i-1].getElementsByTagName("td")[j];
                setTimeout(() =>{
                    curcell.classList.add("bgcurrent");
                    cell1.classList.add("bgmax");
                    curcell.classList.remove("hidden");
                }, (animationSpeed*(capacity+1)*(i-1))+animationSpeed*(j-1));
    
                setTimeout(() =>{
                    curcell.classList.remove("bgcurrent");
                    cell1.classList.remove("bgmax");
                }, (animationSpeed*(capacity+1)*(i-1))+ animationSpeed*(j-1) + animationSpeed);
            }
        }
    }
}

function getItems(capacity, ans, dp, benefits, weights, n){

    let temp_ans = ans;
    let w = capacity;
    let s = "Item Number: ";

    for (let i = n; i > 0; i--){
        if(temp_ans == dp[i-1][w]){
            continue;
        }
        else{
            s += i + " ";
            w -= weights[i-1];
            temp_ans -= benefits[i-1];
        }
    }
    document.getElementById("allItems").value = s;
}

document.getElementById("result").onclick = getAnswer;

var menu = document.querySelector("header ul");
var btn = document.querySelector("#HamburgerMenu");
var links = document.querySelectorAll("header ul li");
btn.onclick = function(){
    btn.classList.toggle("active");
    menu.classList.toggle("open");
}

links.forEach(elem => {
    elem.addEventListener("click", ()=>{
        btn.classList.toggle("active");
        menu.classList.toggle("open");
    })
})