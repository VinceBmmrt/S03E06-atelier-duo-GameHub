
    /**
     * Plan d'action :
     * 1. Générer une grille de 8 cases x 8
     * -  1.1 générer la grille
     * -  1.2 styler la grille
     * 2. Gestion du clic sur un pixel
     * -  2.1 on écoute le clic sur un pixel
     * -  2.2 on switche la couleur blanc/noir
     * 3. Formulaire de configuration
     * -  3.1 on crée le champ et le bouton
     * -  3.2 on écoute la soumission du form
     * -  3.3 on change le nombre de cases
     * -  Bonus: on ajoute un champ pour la taille des pixel
     * Super Bonus: On peut choisir la couleur des nouveaux pixels
     */

     const app = {

        // une propriété pour la taille de la grille
        gridSize: 8,
        // et la taille des pixels
        pixelSize: 25,
      
        styles: [
          'plain',
          'empty',
          'light',
          'highlight',
        ],
      
        chosenStyle: 'plain',
        
        init: function() {
          // on cible le "tableau" et on le met en propriété pour s'en servir ailleurs
          app.drawingArea = document.querySelector('#invader');
          // on cible le formulaire
          app.form = document.querySelector('.configuration');
          // on éxecute la méthode pour dessiner le tableau
          app.drawBoard();
          // on éxecute la méthode pour remplir le formulaire
          app.fillForm();
          // on éxecuter la méthode pour générer la palette
          app.addPalette();
        },
      
        addPalette: function() {
          app.palette = document.createElement('div');
          app.palette.className = 'palette';
      
          // forEach est une méthode des tableaux
          // elle permet de boucler sur ce tableau
          // on transmet une fonction callback à executer à chaque itération
          // cette fonction prend la valeur de l'itération en cours en paramètre
          // finalement on execute une fonction pour chaque entrée d'un tableau
          app.styles.forEach(app.addStyle);
      
          // on ajoute la palette directement dans le body
          document.body.appendChild(app.palette);
        },
      
        addStyle: function(style) {
          const color = document.createElement('a');
          color.className = 'palette-color palette-color--' + style;
          if(style == app.chosenStyle) {
            color.className+= ' palette-color--active';
          }
          // on utilise dataset pour associer une information/une data à un élement
          color.dataset.name = style;
          // on écoute le click pour pouvoir changer la couleur sélectionnée
          color.addEventListener('click', app.handleColorClick);
          app.palette.appendChild(color);
        },
      
        handleColorClick: function(event) {
          // on cible la couleur anciennement active
          const oldColorElement = document.querySelector('.palette-color--active');
          // pour lui supprimer la classe active
          oldColorElement.classList.remove('palette-color--active');
          // on récupère la couleur cliquée
          const newColorElement = event.target;
          // pour lui ajouter la classe active
          newColorElement.classList.add('palette-color--active');
          // connaissant l'élement cliqué, on peut récupérer les data qu'on avait mis dessus
          const newColor = newColorElement.dataset.name;
          app.chosenStyle = newColor;
        },
      
        fillForm: function() {
          // on factorise la création d'input dans une méthode
          app.generateInput('Taille de la grille');
          app.generateInput('Taille des pixels');
      
          // on crée le bouton
          const button = document.createElement('button');
          button.textContent = 'Valider';
          app.form.appendChild(button);
      
          // on écoute la soumission du form, plus pratique pour la soumission au clavier
          app.form.addEventListener('submit', app.handleSubmit);
        },
      
        generateInput: function(placeholder) {
          const input = document.createElement('input');
          input.placeholder = placeholder;
          input.type = 'number';
          app.form.appendChild(input);
        },
      
        handleSubmit: function(event) {
          // on empêche la soumission par défaut
          event.preventDefault();
          // soit on met l'inpiut en propriété de app
          // soit on se déplace dans les enfants de event.tagret c'est à dire le form
          // soit on refait un sélecteur
          const gridInput = event.target.childNodes[0];
          // on récupère la valeur et on s'assure de manipuler un nombre
          const gridValue = Number(gridInput.value);
          // on récupère également le second champ
          const pixelInput = event.target.childNodes[1];
          const pixelValue = Number(pixelInput.value);
          // on peut s'assurer que les champs ne sont pas vides
          if (gridValue && pixelValue) {
            // on modifie nos propriétés
            app.gridSize = gridValue;
            app.pixelSize = pixelValue;
            // on vide la grille actuelle
            app.clearBoard();
            // on en génère une nouvelle
            app.drawBoard();
          }
        },
      
        clearBoard: function() {
          app.drawingArea.innerHTML = '';
        },
      
        // on découpe notre app en plusieurs méthodes ayant chacune un rôle spécifique
        drawBoard: function() {
          // on va imbriquer 2 boucles pour créer autant de lignes et de colonnes que nécessaire
          for (let lineIndex = 0; lineIndex < app.gridSize; lineIndex++) { // Lignes
            // on crée un conteneur par ligne
            const lineContainer = document.createElement('div');
            // on va sortir toutes les instructions relatives aux styles dans une méthode n'ayant que cette responsabilité
            app.setLineStyle(lineContainer);
            // on crée autant de colonnes que nécessaire pour chaque ligne
            for (let columnIndex = 0; columnIndex < app.gridSize; columnIndex++) { // Colonnes de chaque ligne
              // on crée un pixel
              const pixel = document.createElement('div');
              // on définit les styles du pixel dans une méthode dédiée
              app.setPixelStyle(pixel);
              // on écoute l'événement "click" sur le nouveau pixel
              pixel.addEventListener('click', app.handlePixelClick);
              // on ajoute le pixel à la ligne
              lineContainer.appendChild(pixel);
            }
            // on ajoute la ligne au tableau
            app.drawingArea.appendChild(lineContainer);
          }
        },
      
        setLineStyle: function(line) {
          line.className = 'line';
          line.style.width = (app.gridSize * app.pixelSize) + 'px';
        },
      
        setPixelStyle: function(pixel) {
          // on rajoute 2 classes à notre pixel :
          // la première générique la bordure et le type de pointeur
          pixel.classList.add('pixel');
          // la deuxième pour rajouter une couleur de base au pixel
          pixel.classList.add('pixel--plain');
          pixel.style.width = app.pixelSize + 'px';
          pixel.style.height = app.pixelSize + 'px';
        },
      
        handlePixelClick: function(event) {
          // on peut récupérer l'élement sur lequel l'événement s'est déclénché via target
          // console.log(event.target);
          const pixel = event.target;
      
          // on peut aisément manipuler les classes avec classList
          // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
          // if (pixel.classList.contains('pixel--plain')) {
          //   pixel.classList.remove('pixel--plain');
          //   pixel.classList.add('pixel--empty');
          // }
          // else {
          //   pixel.classList.remove('pixel--empty');
          //   pixel.classList.add('pixel--plain');
          // }
      
          // on s'assure de virer tous les styles
          app.styles.forEach(function(currentStyle) {
            pixel.classList.remove('pixel--' + currentStyle);
          });
          // et on ajoute celui sélectionné
          pixel.classList.add('pixel--' + app.chosenStyle);
        },
      
      };
      
      // quand le document est prêt on initialise notre application
      document.addEventListener('DOMContentLoaded', app.init);