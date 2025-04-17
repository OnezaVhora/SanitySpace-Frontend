document.addEventListener('DOMContentLoaded', () => {
    // Chat functionality
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const responseBox = document.getElementById('chat-response');
        const message = input.value;
        input.value = '';
        responseBox.textContent = 'Thinking...';
  
        try {
          const res = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
          });
          const data = await res.json();
          responseBox.textContent = data.response;
        } catch (err) {
          responseBox.textContent = 'Error processing your request.';
        }
      });
    }
  
    // Mood Check functionality
    const moodForm = document.getElementById('mood-form');
    if (moodForm) {
      moodForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const mood = document.getElementById('mood-input').value.toLowerCase();
        const moodResponse = document.getElementById('mood-response');
  
        const moodTips = {
          happy: "That's wonderful! Keep up the good vibes—take time to spread that joy.",
          sad: "It's okay to feel sad. Try journaling or going for a walk to reflect.",
          stressed: "Take a deep breath. A mindfulness break or stretching might help.",
          anxious: "Try grounding techniques—focus on 5 things you can see around you.",
          angry: "Cool off with a calm environment or writing down your feelings.",
          tired: "Rest is vital. Consider a short nap, deep breathing, or reducing screen time.",
          frustrated: "Try square breathing or break your task into smaller steps."
        };
  
        moodResponse.textContent = moodTips[mood] || "Thanks for sharing. Remember, it's okay to feel all emotions. Consider checking out our resources.";
      });
    }
  
    // Journal Entry functionality
    const journalForm = document.getElementById('journal-form');
    const journalList = document.getElementById('journal-entries');
    if (journalForm) {
      journalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const entry = document.getElementById('journal-entry').value;
        const entryItem = document.createElement('li');
        entryItem.textContent = entry;
        journalList.appendChild(entryItem);
        document.getElementById('journal-entry').value = '';
      });
    }
  
    // Breathing animation
    const breatheBtn = document.getElementById('breathe-btn');
    if (breatheBtn) {
      breatheBtn.addEventListener('click', () => {
        const box = document.createElement('div');
        box.className = 'breathing-box';
        document.body.appendChild(box);
        box.innerHTML = '<p>Breathe In</p>';
        let phase = 0;
        const phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
        const intervals = [4000, 4000, 4000, 4000];
  
        const breathe = () => {
          box.innerHTML = `<p>${phases[phase]}</p>`;
          box.style.transform = phase % 2 === 0 ? 'scale(1.5)' : 'scale(1)';
          setTimeout(() => {
            phase = (phase + 1) % 4;
            breathe();
          }, intervals[phase]);
        };
  
        breathe();
      });
    }
  
    // Load Resources from external API
    const resourceBtn = document.getElementById('get-resources');
    if (resourceBtn) {
      resourceBtn.addEventListener('click', async () => {
        const output = document.getElementById('resources-output');
        output.textContent = 'Loading...';
        try {
          const res = await fetch('https://mentalhealth-api.vercel.app/resources');
          const data = await res.json();
          output.innerHTML = data.resources
            .map(r => `<li><a href="${r.url}" target="_blank">${r.name}</a>: ${r.description}</li>`)
            .join('');
        } catch (err) {
          output.textContent = 'Error fetching resources.';
        }
      });
    }
  });