 // --- SLIDER ---
        let currentSlide = 0;
        const totalSlides = 6;
        const imagesWrapper = document.getElementById('sliderImages');
        const dots = document.querySelectorAll('.dot');
        let autoSlide;

        function updateSlider() {
            imagesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function changeSlide(direction) {
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            if (currentSlide >= totalSlides) currentSlide = 0;
            updateSlider();
            resetAutoSlide();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
            resetAutoSlide();
        }

        function resetAutoSlide() {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => changeSlide(1), 5000);
        }

        autoSlide = setInterval(() => changeSlide(1), 5000);

        // --- MODAL PROMOCIONES ---
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('promoModal').classList.add('active');
            }, 500);
        });

        function closeModal() {
            document.getElementById('promoModal').classList.remove('active');
        }

        document.getElementById('promoModal').addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });

        // --- CHATBOT EL CENTOLLO - 10 PREGUNTAS EXCLUSIVAS ---
        var chatbotAnswers = [
            "Nuestro horario de atencion es: Lunes a viernes de 8:00 a 14:30 horas. Sábados de 8:00 a 14:00 horas. Domingos y festivos cerrada.",
            "Si! Hacemos domicilios en toda Bogota. El tiempo de entrega es de 30 a 45 minutos. Puedes pedir por WhatsApp al (57) 316 690 0508.",
            "Nuestro plato estrella es la Mariscada de crustaceos y centolla rellena. Tambien muy solicitados: la Falsa mousse de centollo y los Spaghetti con carne de centolla.",
            "Te recomendamos reservar con al menos 24 horas de anticipacion, especialmente los fines de semana. Puedes hacerlo escaneando el codigo QR en la pagina de Reservas.",
            "Contamos con opciones vegetarianas como nuestras ensaladas frescas, sopas de vegetales y pasta con salsa de tomate artesanal. Pregunta por el menu vegetariano al llegar!",
            "Si, aceptamos todas las tarjetas de credito y debito (Visa, Mastercard, American Express). Tambien aceptamos pagos por Nequi, Daviplata y efectivo.",
            "Si, contamos con parqueadero privado gratuito para nuestros clientes con capacidad para 20 vehiculos. Tambien hay zona de parqueo en la calle.",
            "Por supuesto! Organizamos eventos privados, cenas de empresa, celebraciones de cumpleanos y mas. Capacidad para hasta 80 personas. Contactanos para cotizar.",
            "El tiempo de espera promedio para una mesa es de 10-15 minutos en dias de semana y 20-30 minutos los fines de semana. Con reserva, tu mesa estara lista a la hora indicada.",
            "Si, tenemos un menu infantil con opciones como mini hamburguesas de pescado, nuggets de camaron, spaghetti con salsa de tomate y postres especiales para los pequenos."
        ];
        var chatbotQuestions = [
            "Cual es el horario de atencion?",
            "Hacen domicilios?",
            "Cual es el plato mas popular?",
            "Necesito reservar con anticipacion?",
            "Tienen opciones vegetarianas?",
            "Aceptan tarjetas de credito?",
            "Tienen estacionamiento?",
            "Hacen eventos privados?",
            "Cual es el tiempo de espera promedio?",
            "Tienen menu infantil?"
        ];

        function toggleChatbot() {
            var win = document.getElementById('chatbot-window');
            win.classList.toggle('chatbot-hidden');
        }

        function askQuestion(index) {
            var messagesDiv = document.getElementById('chatbot-messages');
            var userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.innerHTML = '<div class="chat-bubble">' + chatbotQuestions[index] + '</div>';
            messagesDiv.appendChild(userMsg);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            setTimeout(function() {
                var botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.innerHTML = '<div class="chat-bubble">' + chatbotAnswers[index] + '</div>';
                messagesDiv.appendChild(botMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }, 600);
        }