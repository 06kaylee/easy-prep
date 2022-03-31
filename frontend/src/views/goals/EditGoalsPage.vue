<template>
    <base-card>
        <goals-form isEditing></goals-form>
        {{ id }}
    </base-card>
</template>

<script>
import GoalsForm from '../../components/goals/GoalsForm.vue';

export default {
    components: {
        GoalsForm
    },
    props: ['id']
}
</script>