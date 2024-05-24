<template>
  <layout-div>
    <div class=" bg-gray-100 dark:bg-gray-900">
      <div class="p-6 lg:p-8">
        <Form :tasks="tasks" @refetchAllTasks="getAllTasks" />
      </div>
      <div class="p-6 lg:p-8">
        <Listing :tasks="tasks" @refetchAllTasks="getAllTasks" />
      </div>
    </div>
    <!-- <div class=" bg-gray-100 dark:bg-gray-900">
      <div class="container mx-auto p-6 lg:p-8">
      </div>
    </div> -->
  </layout-div>
</template>
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Form from '../tasks/Form.vue';
import Listing from '../tasks/Listing.vue';
export default {
  name: 'DashboardPage',
  components: {
    LayoutDiv,
    Form,
    Listing
  },
  data() {
    return {
      tasks: {},
      tasksListing: {},
    };
  },
  created() {
      this.getAllTasks();
  },
  methods: {
    getAllTasks() {
      axios.get('/tasks/all', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        .then((r) => {
          this.tasks = r.data.data;
          return r
        })
        .catch((e) => {
          return e
        });
    },
  },
};
</script>