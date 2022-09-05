<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="btn-container">
                <slot name="icons"></slot>
                <button @click="close" class="close-modal-btn">
                    <font-awesome-icon :icon="['fas', 'x']" />
                </button>
            </div>
            <header class="modal-header">
                <slot name="header"></slot>
            </header>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.btn-container {
    display: flex;
    justify-content: flex-end;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
	max-width: 30rem;
	max-height: 30rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 2rem;
	text-align: center;
	border-radius: 1rem;
	animation: fadeIn 1s;
	background: white;
}

.modal-header {
    display: flex;
    justify-content: center;
}

.close-modal-btn {
	border: none;
	background: transparent;
	color: red;
	justify-self: end;
	cursor: pointer;
    align-self: start;
}

.modal::backdrop {
	background: rgba(0, 0, 0, 0.4);
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>