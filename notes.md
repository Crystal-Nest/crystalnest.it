# Generali

Ancora non hai configurato correttamente ESLint nel tuo ambiente di lavoro.  
Assicurati di avere l'estensione installata e di aver disattivato l'autosave.  
Se proprio non vuoi disattivare l'autosave, ricordati ad ogni commit di lanciare il comando di `eslint:fix`.

Mi sa che vale la stessa cosa per Prettier. Devi installare l'estensione.

Sistema pure gli errori che ho commesso io nella creazione dei componenti vari. Ad esempio, il button ha ancora le icone create passando dentro un nodo di testo alle mat-icon, il contact-button ha ancora lo span inutile attorno al testo e un if completamente innecessario, e probabilmente trovi errori simili da altri parti. Se li noti, sistemali.

# Shared

### Separator

Come lo si rende orizzontale ora?

### Navigation Link & Navigation Bar

Sempre meglio non mettere input opzionali, piuttosto dei valori di default (es. remote meglio fare `= false`).  
Cercare di evitare il più possibile l'utilizzo di ng-content: se sicuramente dentro alla navigation bar ci vanno solo dei navigation link, meglio adottare la stessa strategia che ho usato per lo stepper.  
Inoltre, non so se hai notato, ma i navigation link che dovrebbero avere un href (es. modrinth, curseforge, ecc.) non funzionano.  
Infine, se in ogni punto in cui vengono usati i navigation link gli viene sempre passata un'immagine dentro, che senso ha? Metti direttamente l'immagine dentro al componente e fai passare da fuori il link. Tanto, proprio a livello di struttura, non è corretto che tali componenti possano avere la qualunque dentro, avranno sempre 1 immagine e un testo opzionale.

# Frame

È incorretto che l'header e il footer siano fuori dalla sidebar. O meglio, è incorretto che la sidebar non vada anche sopra il footer. Con l'header va bene se non va sopra finché all'occhio appaia sopra e l'apertura funzioni.  
Tuttavia, la sidebar non si apre nemmeno più, non so se per via di una lavorazione parziale o perché hai deciso di togliere la cosa. Nel caso tu abbia deciso di togliere la cosa, non va bene, ripristina la funzionalità. Voglio assolutamente che la sidebar si possa aprire come prima, ed avere ancora l'effetto della "sovrapposizione" delle scritte.  
Inoltre, il footer, come prima, deve non essere immediatamente presente nella pagina e visibile solo dopo scroll. Se anche questa modifica è stata fatta appositamente, è da rimodificare per farlo apparire come prima.

### Header

Non va **assolutamente** bene toccare lo stile di componenti figli dai padri. Ogni componente dovrebbe sempre essere fatto e finito, e al massimo adattivo in base a qualche (meno possibili) input.  
Come mai prima l'aspetto dei pulsanti-link era lo stesso, ma non c'era bisogno di toccare lo stile dei figli dal padre? È possibile e va fatto.  
Visto quanto detto per i [navigation link](#navigation-link--navigation-bar) e anche quanto appena sopra, verifica se non è possibile unificare i componenti contact-button e navigation-link. Ad occhio a me sembra di sì, soprattutto considerando l'attuazione della stessa strategia dello stepper (rendendo inutile la srittura manuale del `<li>`) e sostituendo l'`<ng-content>` con semplicemente un'immagine.  
In caso ci siano difficoltà riguardo questa parte, possiamo vederla assieme.
