import type { App } from 'vue';
import AppHeader from '@/components/app/AppHeader.vue';
import BaseForm from '@/components/base/BaseForm.vue'
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import ProgressBar from '@/components/global/ProgressBar.vue';
import Loader from '@/components/global/Loader.vue';
import EmptyState from '@/components/global/EmptyState.vue';
import Toasts from '@/components/global/Toasts.vue';
// ToDo components 
import TodoItem from "@/components/todos/TodoItem.vue";
import TodoForm from "@/components/todos/TodoForm.vue";
import TodoList from "@/components/todos/TodoList.vue";


export default {
  install(app: App) {
    // Core primitives
    app.component('AppHeader', AppHeader);
    app.component('BaseForm', BaseForm);
    app.component('BaseSelect', BaseSelect);
    app.component('BaseButton', BaseButton);
    app.component('BaseInput', BaseInput);
    app.component('BaseCheckbox', BaseCheckbox);
    app.component('BaseCard', BaseCard);


    // Wizard / Layout helpers
    app.component('ProgressBar', ProgressBar);
    app.component('Loader', Loader);
    app.component('EmptyState', EmptyState);

    // Utilities / Overlays
    app.component('Toasts', Toasts);

    // ToDo components
    app.component('TodoItem', TodoItem);
    app.component('TodoForm', TodoForm);
    app.component('TodoList', TodoList);
  }
};