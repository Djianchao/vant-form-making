<template>
	<div class="phone">
		<van-empty
			class="empty"
			v-if="!list.length"
			description="从左侧拖拽来添加组件"
		/>
		<draggable
			v-model="list"
			class="deng"
			v-bind="{group:'people', ghostClass: 'ghost',animation: 200}"
		>
			<template v-for="(el, i) in list">
				<WidgetFormItem
					:el=el
					:key=i
				/>
			</template>
		</draggable>
	</div>
</template>

<script>
	//导入draggable组件
	import draggable from "vuedraggable";
	import WidgetFormItem from "./WidgetFormItem";

	export default {
		//注册draggable组件
		name: "WidgetForm",
		components: {
			draggable,
			WidgetFormItem,
		},
		data() {
			return {
				list: [],
			};
		},
		methods: {
			//开始拖拽事件
			onStart() {
				this.drag = true;
			},
			//拖拽结束事件
			onEnd() {
				this.drag = false;
			},
		},
	};
</script>
<style scoped>
	.phone {
		position: relative;
		background-color: #fff;
		box-shadow: 0 10px 20px #ebedf0;
		padding: 20px;
		border-radius: 20px;
		width: 500px;
		height: 850px;
		overflow-y: auto;
		margin: 0 auto;
	}
	.deng {
		width: 100%;
		height: 100%;
	}
	.phone::-webkit-scrollbar {
		width: 0px;
	}
	.empty {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>