// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
ga('create', 'UA-12345-6', 'auto');
ga('send', 'pageview');

const events = {
  '.menu-lista-contato': {
    'trigger': 'click',
    'params': (element) => {
      return {
        'eventCategory': 'menu',
        'eventAction': 'entre_em_contato',
        'eventLabel': 'link_externo' 
      }
    }
  },
  '.menu-lista-download': {
    'trigger': 'click',
    'params': (element) => {
      return {
        'eventCategory': 'menu',
        'eventAction': 'download_pdf',
        'eventLabel': 'download_pdf' 
      }
    }
  },
  '.card-montadoras': {
    'trigger': 'click',
    'condition': window.location.pathname.startsWith('/analise'),
    'params': (element) =>  {
      return {
        'eventCategory': 'analise',
        'eventAction': 'ver_mais',
        'eventLabel': element.dataset.name
      }
    }
  },
  '.contato input': {
    'trigger': 'change',
    'condition': window.location.pathname.startsWith('/sobre'),
    'params': (element) =>  {
      return {
        'eventCategory': 'contato',
        'eventAction': element.id,
        'eventLabel': 'preencheu'
      }
    }
  },
  'body .lightbox': {
    'trigger': 'transitionend',
    'triggerOnce': true,
    'condition': window.location.pathname.startsWith('/sobre'),
    'params': (element) =>  {
      return {
        'eventCategory': 'contato',
        'eventAction': 'enviado',
        'eventLabel': 'enviado'
      }
    }
  }
};

const handleTriggers = () => {
  for (let eventClass in events) {
    let elements = document.querySelectorAll(eventClass);
    let event = events[eventClass];

    if (elements && (!event.hasOwnProperty('condition') || event.condition)){
      elements.forEach(element => 
        element.addEventListener(
          event.trigger,
          () => ga('send', { hitType: 'event', ...event.params(element) }),
          {
            once: event.triggerOnce ? true : false
          }          
        )
      );
    }
  }
};

window.onload = handleTriggers;