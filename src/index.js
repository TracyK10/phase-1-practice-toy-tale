let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch Andy's Toys
  let toyCollection = document.querySelector("#toy-collection");
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let div = document.createElement("div");
        div.className = "card";
        toyCollection.appendChild(div);
        // Add Toy Info to the Card
        let h2 = document.createElement("h2");
        h2.textContent = item.name;
        let img = document.createElement("img");
        img.src = item.image;
        img.className = "toy-avatar";
        let p = document.createElement("p");
        p.textContent = `${item.likes} likes`;
        let button = document.createElement("button");
        button.className = "like-btn";
        button.textContent = "Like ❤️";
        button.id = item.id;
        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(button);

        // updating the number of likes
        let numLikes = parseInt(p.textContent)
        button.addEventListener('click', () =>{
          numLikes +=1;
          p.textContent = `${numLikes} likes`

          fetch(`http://localhost:3000/toys/${item.id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
              likes: numLikes
            })
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log(error))     
        })
      });

      // Add a New Toy
      const newToy = document.querySelector(".submit");
      newToy.addEventListener("click", () => {
        const inputValueName =
          document.querySelector('input[name="name"]').value;
        const inputValueImage = document.querySelector(
          'input[name="image"]'
        ).value;

        // getting the new id
        const maxId = Math.max(...data.map(toy => toy.id));

        // Create new toy object
        const newToy = {
          id: (maxId + 1).toString(),
          name: inputValueName,
          image: inputValueImage,
          likes: 0, 
        };

        // Send POST request to add new toy
        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newToy),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      });
    })
    .catch((error) => console.error(error));

    
});
