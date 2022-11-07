// import functions and grab DOM elements
import { renderMushroom, renderFungus, renderFriend } from './render-utils.js';
import { addFriend, findFriendByName } from './data-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const fungiEl = document.querySelector('.fungi');
const addFungusButton = document.getElementById('add-fungus-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;
let fungusCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        friendEl.addEventListener('click', () => {
            const friendInState = findFriendByName(friend.name, friendData);
            //         and if the friend's satisfaction level is below 3 and you have mushrooms left
            if (mushroomCount === 0) {
                alert('no mushrooms left! go forage for some more');
            }
            if (fungusCount === 0) {
                alert('no fungi left! go forage for some more');
            }
            //             increment the friends satisfaction and decrement your mushrooms
            if (mushroomCount > 0 && friendInState.satisfaction < 3) {
                friendInState.satisfaction++;
                mushroomCount--;
                //             then display your friends and mushrooms with the updated state
                displayFriends();
                displayMushrooms();
            }
            if (fungusCount > 0 && friendInState.satisfaction < 3) {
                friendInState.satisfaction++;
                fungusCount--;

                displayFriends();
                displayFungi();
            }
        });
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}

function displayMushrooms() {
    mushroomsEl.textContent = '';
    // clear out the mushroom div
    for (let i = 0; i < mushroomCount; i++) {
        const mushroomEl = renderMushroom();
        // for each mushroom in your mushroom state, render and append a mushroom
        mushroomsEl.append(mushroomEl);
    }
}

function displayFungi() {
    fungiEl.textContent = '';

    for (let i = 0; i < fungusCount; i++) {
        const fungusEl = renderFungus();

        fungiEl.append(fungusEl);
    }
}

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    const name = friendInputEl.value;
    // create a new friend object
    const newFriend = {
        name: name || `Friend #${Math.floor(Math.random() * 1000)}`,
        satisfaction: 1,
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // reset the input
    friendInputEl.value = '';
    // display all the friends (use a function here)
    displayFriends();
});

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFungusButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a fungus!');

        fungusCount++;
        displayFungi();
    } else {
        alert('no luck!');
    }
});

displayFriends();
displayMushrooms();
displayFungi();
