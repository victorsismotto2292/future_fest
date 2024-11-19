var botao = false

document.getElementById('IA').addEventListener('click', function () {
    window.scrollBy({
        top: 950,
        behavior: 'smooth'
    });
});

document.getElementById('Tecnologia da Educação').addEventListener('click', function () {
    window.scrollBy({
        top: 1340,
        behavior: 'smooth'
    });
});

document.getElementById('Acesso à Informação').addEventListener('click', function () {
    window.scrollBy({
        top: 1650,
        behavior: 'smooth'
    });
});

document.getElementById('Aprendizagem Personalizada').addEventListener('click', function () {
    window.scrollBy({
        top: 1900,
        behavior: 'smooth'
    });
});

document.getElementById('Engajamento e Motivação').addEventListener('click', function () {
    window.scrollBy({
        top: 2250,
        behavior: 'smooth'
    });
});

document.getElementById('Desenvolvimento de Habilidades').addEventListener('click', function () {
    window.scrollBy({
        top: 2450,
        behavior: 'smooth'
    });
});
document.getElementById('Acessibilidade').addEventListener('click', function () {
    window.scrollBy({
        top: 2800,
        behavior: 'smooth'
    });
});

document.getElementById('Desafios').addEventListener('click', function () {
    window.scrollBy({
        top: 3300,
        behavior: 'smooth'
    });
});

document.getElementById('vantagens').addEventListener('click', function () {
    window.scrollBy({
        top: 4450,
        behavior: 'smooth'
    });
});

async function callDeepbrainAPI(inputText) {
    const response = await fetch('https://app.aistudios.com/api/odin/v3/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'https://app.aistudios.com/api/odin/v3/auth/token'
        },
        body: JSON.stringify({ text: inputText })
    });

    if (!response.ok) {
        throw new Error('Erro na chamada da API: ' + response.statusText);
    }

    const data = await response.json();
    return data;
}

callDeepbrainAPI('Olá, como posso ajudar?')
    .then(response => console.log(response))
    .catch(error => console.error('Erro:', error));


let inputElement = document.querySelector("input")
let listElement = document.querySelector("ul")
let itemElement = listElement.querySelectorAll("li")

inputElement.addEventListener("input", (e) => {
    let inputed = e.target.value.toLowerCase()
    itemElement.forEach((li) => {
        let text = li.textContent.toLowerCase()
        if (text.includes(inputed)) {
            li.style.display = "block"
        } else {
            li.style.display = "none"
        }
    })
})

const mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function fetchVideoFromPexels(query) {
    const apiKey = 'YOUR_PEXELS_API_KEY';
    const response = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'Authorization': apiKey
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar vídeos: ' + response.statusText);
    }

    const data = await response.json();
    return data.videos;
}

async function buscarVideos() {
    const API_KEY = 'SOkxzdalf0Gvlun1uhSe7EAhOUo2oF4tiWmQJcWdrpieXqkfWpDAPtXg';
    const keyword = document.getElementById('search-input').value.trim();

    if (keyword === "") {
        alert("Por favor, digite um termo para pesquisa.");
        return;
    }

    const response = await fetch(`https://api.pexels.com/videos/search?query=${keyword}&per_page=1`, {
        method: 'GET',
        headers: {
            'Authorization': API_KEY
        }
    });

    const data = await response.json();
    console.log(data);

    if (data.videos && data.videos.length > 0) {
        const videoUrl = data.videos[0].video_files[0].link;
        const videoContainer = document.getElementById("video-container");
        videoContainer.innerHTML = `<video src="${videoUrl}" controls></video>`;
    } else {
        document.getElementById("video-container").innerHTML = "<p>Nenhum vídeo encontrado.</p>";
    }
}
