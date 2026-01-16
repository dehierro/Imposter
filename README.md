# Imposter

Aplicación web estática para dirigir partidas del juego social **Imposter** desde un único dispositivo. La interfaz guía al grupo por todas las fases: configuración, reparto de roles, aviso de inicio de pistas, discusión y votación.

## Características principales
- Preparación rápida: pega todos los nombres (uno por línea), elige categoría y define cuántos impostores habrá.
- Asignación automática de impostores y seguimiento de la ronda actual.
- Indicador visible de quién inicia cada ronda de pistas.
- Tabla de votos editable con recuento instantáneo del resultado.
- Indicadores visuales para el temporizador sugerido y rondas extra.

## Cómo ejecutar
1. Clona o descarga este repositorio.
2. Abre `index.html` en tu navegador preferido. También puedes usar extensiones como *Live Server* en VS Code para recargar automáticamente los cambios durante el desarrollo.

No se requieren dependencias ni compilación: todo es JavaScript, HTML y CSS puros.

## Flujo recomendado de juego
1. **Preparación:** escribe los nombres (uno por línea), elige categoría y establece el número de impostores antes de pulsar “Iniciar partida”.
2. **Roles:** pasa el dispositivo; cada jugador pulsa “Mostrar rol” y luego “Siguiente jugador”.
3. **Pistas:** sigue la indicación de quién abre la ronda; el resto continúa en sentido horario.
4. **Discusión y voto:** cuando estén listos, cambia a la pantalla de votación y registra los acusados.
5. **Resultado:** revela si la mayoría acertó y repite con “Siguiente ronda”.

## Personalización futura
- Añadir banco de palabras por idioma definido por el usuario (o permitir palabras personalizadas).
- Exportar historial de rondas a PDF o texto.
- Integrar un cronómetro visual para la fase de pistas.

¡Listo! Copia este juego en cualquier laptop o tablet y llévalo a tu próxima reunión.
