// --- CHATBOT EL CENTOLLO ---
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

        // --- EFECTOS INTERACTIVOS DEL MENÚ ---
        document.addEventListener('DOMContentLoaded', function() {
            var menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(function(item, index) {
                // Efecto de ripple al click
                item.addEventListener('click', function(e) {
                    var ripple = document.createElement('span');
                    ripple.style.cssText = 'position:absolute;background:rgba(192,57,43,0.3);border-radius:50%;transform:scale(0);animation:rippleEffect 0.6s ease-out;pointer-events:none;z-index:10;';
                    var rect = this.getBoundingClientRect();
                    var size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
                    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
                    this.appendChild(ripple);
                    setTimeout(function() { ripple.remove(); }, 600);
                });

                // Efecto de tilt 3D al mover el mouse
                item.addEventListener('mousemove', function(e) {
                    var rect = this.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    var centerX = rect.width / 2;
                    var centerY = rect.height / 2;
                    var rotateX = (y - centerY) / 20;
                    var rotateY = (centerX - x) / 20;
                    this.style.transform = 'translateY(-8px) scale(1.01) perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
                });

                item.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
        });
    

        // --- LIGHTBOX / GALERÍA DE PLATILLOS ---
        var lightboxImages = [];
        var currentLightboxIndex = 0;

        // Collect all menu items with data-full attribute
        document.addEventListener('DOMContentLoaded', function() {
            var menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(function(item, index) {
                var img = item.querySelector('.menu-img img');
                var title = item.querySelector('.menu-content h3');
                if (img && img.getAttribute('data-full')) {
                    lightboxImages.push({
                        src: img.getAttribute('data-full'),
                        title: title ? title.textContent.replace(/\s+/g, ' ').trim() : ''
                    });

                    // Make the entire menu item clickable for lightbox
                    item.addEventListener('click', function(e) {
                        // Don't open if clicking on bookmark icon
                        if (e.target.closest('.fa-bookmark')) return;
                        openLightbox(index);
                    });
                    item.style.cursor = 'pointer';
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                var lightbox = document.getElementById('lightbox');
                if (!lightbox.classList.contains('active')) return;

                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') changeLightboxImage(-1);
                if (e.key === 'ArrowRight') changeLightboxImage(1);
            });
        });

        function openLightbox(index) {
            currentLightboxIndex = index;
            var lightbox = document.getElementById('lightbox');
            var img = document.getElementById('lightbox-img');
            var title = document.getElementById('lightbox-title');

            img.src = lightboxImages[index].src;
            title.textContent = lightboxImages[index].title;

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox(e) {
            if (e && e.target !== e.currentTarget && !e.target.classList.contains('lightbox-close')) return;

            var lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function changeLightboxImage(direction) {
            currentLightboxIndex += direction;

            if (currentLightboxIndex < 0) {
                currentLightboxIndex = lightboxImages.length - 1;
            } else if (currentLightboxIndex >= lightboxImages.length) {
                currentLightboxIndex = 0;
            }

            var img = document.getElementById('lightbox-img');
            var title = document.getElementById('lightbox-title');

            // Fade effect
            img.style.opacity = '0';
            setTimeout(function() {
                img.src = lightboxImages[currentLightboxIndex].src;
                title.textContent = lightboxImages[currentLightboxIndex].title;
                img.style.opacity = '1';
            }, 200);
        }