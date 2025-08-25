const API_BASE_URL = 'https://localhost:3000/api';

const productForm = document.getElementById('productForm');
const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const productsLoading = document.getElementById('productsLoading');
const refreshButton = document.getElementById('refreshButton');
const clearButton = document.getElementById('clearButton');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const submitText = document.getElementById('submitText');

//toast
//@param {string} message //A mensagem a ser exibida
//@param {string} [type ='sucess']

function showToast(message, type ='sucess'){
    const toastEl = document.getElementById('toast');
    toastMessage.textContent = message;
    toastEl.firstElementChild.classList.remove('bg-green-500', 'bg-red-500', 'bg-yellow-500');
    if(type==='error'){
        toastEl.firstElementChild.classList.add('bg-red-500');
    } else if(type==='warning'){
        toastEl.firstElementChild.classList.add('bg-yellow-500');
    }else{
        toastEl.firstElementChild.classList.add('bg-green-500');
    }
    toastEl.classList.remove('hidden')
    setTimeout(()=>{
        toastEl.classList.add('hidden')
    },3000);
}

//processa imagens vinda do drive

//@param {string} url
//@returns {string}

function processImageUrl (url){
    if(!url) return '';
    if(url.includes('drive.google.com')){
        let fileId = null;
        let match = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
        if(match){
            fileId = match[1];
        }
        if(!fileId){
            match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (match){
                fileId =match[1];
            }
        }
        if (fileId){
            return`https://lh3.googleusercontent.com/d/$(fileId)`
        }
    }
    return url
}

function createProductCard(product){
    const imageUrl = processImageUrl(product.image);
    const imageElement =imageUrl?
    `<img src="${imageUrl}" alt="${product.nome}" class="w-full h-48 product-image" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` :'';
    const imagePlaceholder = `
    <div class="w-full h-48 image-placeholder" style="display:${imageUrl ? 'nome':'flex'}>📦</div>
    `;
    return `
    <div class="bg-white rounded-lg shadow-md overflow-hidden card-hover">
        <div class="absolute top-2 right-2">
            <span class="bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-2 py-1 rounded-full font-medium">${product.categoria}</span>
        </div>
    </div>

    <div class="p-4">
        <div class="mb-3">
            <h3 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-2"> ${product.nome}</h3>
            <div class="text-2x1 font-bold text-green-600">
                R$ ${parseFloat(product.preco).toFixed(2).replace('.',',')}
            </div>
        </div>
        ${product.descricao ? `<p class="text-gray-600 text-sm mb-4 line-clamp-3> ${product.descricao}</p>`:''}
        <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <small class="text-gray-500">
                ${new Date(product.createAt).toLocaleDateString('pt-br')}
            </small>
            <div class="flex gap-2">
                <button onclick="editProduct('${product.id}')" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition duration 200" title ="Editar produto">✏️</button>
                <button onclick="deleteProdut('${product.id}')" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition duration-200" title ="Excluir produto">🗑️</button>
            </div>
        </div>
    </div>
    `
    async function loadProducts(){
        try{
            productsLoading.classList.remove('hidden')
            emptyState.classList.add('hidden')
            const response = await fetch('${API_BASE_URL}/products')
            if(!response.ok){
                throw new Error ('Erro ao carregar produtos')
            }
            const result = await response.json()
            const products = result.data || result
            productsGrid.innerHTML =''
            if (products.length ===0){
                emptyState.classList.remove('hidden')
            }else{
                products.forEach(product=>{
                    productsGrid.innerHTML +=createProductCard(product)
                })
            }
        } catch(error){
            console.error('Erro ao carregar produtos', error)
            showToast('Erro ao carregar produtos. verifique se o servidor esta funcionando')
            emptyState.classList('hidden')
        }finally{
            productsLoading.classList.add('hidden')
        }
    }
}