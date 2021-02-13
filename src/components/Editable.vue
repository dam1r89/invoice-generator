<template>
	<div ref="editable" v-if="edit" contenteditable @input="$emit('update:modelValue', $event.target.innerText)">{{ modelValue }}</div>
	<div v-else @click="startEdit">{{ display || modelValue }}</div>
</template>
<script>
export default {
	name: 'editable',
	props: ['modelValue', 'display'],
	data() {
		return {
			edit: false,
		}
	},
	methods: {
		startEdit() {
			this.edit = true;
			setTimeout(() => {
				this.$refs.editable.focus();
				document.execCommand('selectAll',false,null);
			})

			const handler = (e) => {
				if (e.target === this.$refs.editable) {
					return;
				}
				this.edit = false;
				document.removeEventListener('click', handler, true);
			}
			// TODO Handle component destroy

			document.addEventListener('click', handler, true);


		}
	}
};
</script>