import { createApp } from 'vue';
import router from './router';
import store from './store/index';
import App from './App.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseContainer from './components/ui/BaseContainer.vue';
import BaseDialog from './components/ui/BaseDialogue.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('base-button', BaseButton);
app.component('base-container', BaseContainer);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
