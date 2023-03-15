const form = document.getElementById('feed-form');

const formFields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  message: document.getElementById('message')
};

// Функция для очистки полей формы после отправки сообщения
function clearFormFields() {
  formFields.name.value = '';
  formFields.email.value = '';
  formFields.phone.value = '';
  formFields.message.value = '';
}

// Функция для обработки успешной отправки формы
function handleFormSubmitSuccess(response) {
  console.log(response.data);
  clearFormFields();
  alert('Your message has been sent!');
}

// Функция для обработки неуспешной отправки формы
function handleFormSubmitError(error) {
  console.log(error);
  alert('Your message has NOT been sent!');
}

// Функция для отправки формы
async function submitForm(event) {
  event.preventDefault();

  const formData = {
    name: formFields.name.value ?? '',
    email: formFields.email.value ?? '',
    phone: formFields.phone.value ?? '',
    message: formFields.message.value ?? '',
  };

  try {
    const response = await axios.post('https://m-ojdg.onrender.com/api/feedback', formData);
    handleFormSubmitSuccess(response);
  } catch (error) {
    handleFormSubmitError(error);
  }
}

// Добавление обработчика событий
form.addEventListener('submit', submitForm);

// Интерсепторы axios
axios.interceptors.request.use(function logRequestInterceptor(config) {
    console.log('Request Interceptor:', config);
    return config;
    });
    
    axios.interceptors.response.use(
    function logResponseInterceptor(response) {
    console.log('Response Interceptor:', response);
    return response;
    },
    function logResponseErrorInterceptor(error) {
    console.log('Response Interceptor Error:', error);
    return Promise.reject(error);
    }
    );