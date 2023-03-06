<template>
	<div id="app">
		<el-container>
			<el-aside width="280px">
				<div class="van-doc-nav components-list">
					<draggable
						tag="ul"
						:list="basicComponents"
						v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
						@end="handleMoveEnd"
						@start="handleMoveStart"
						:move="handleMove"
					>
						<template v-for="(item, index) in basicComponents">
							<li :key="index">
								<a>
									<span>{{item.name}}</span>
								</a>
							</li>
						</template>
					</draggable>
				</div>
			</el-aside>
			<el-main>
				<div class="main-box">
					<WidgetForm ref="WidgetForm" />
				</div>
			</el-main>
			<el-aside>
				<div class="right-box">
					<van-button
						type="primary"
						@click="showCode"
					>显示代码</van-button>
				</div>
			</el-aside>
		</el-container>

		<el-dialog :visible.sync="show">
			<el-input
				ref="codePanel"
				v-model="code"
				type="textarea"
				:autosize="true"
			>
			</el-input>
		</el-dialog>
	</div>

</template>

<script>
	import { basicComponents } from "./components/componentsConfig";

	import WidgetForm from "./components/WidgetForm";
	import draggable from "vuedraggable";
	import genCode from "./genCode";

	export default {
		components: {
			WidgetForm,
			draggable,
		},
		data() {
			return {
				basicComponents,
				show: false,
			};
		},
		mounted() {
			// console.log(this.$refs.WidgetForm.$el.innerHTML);
		},
		methods: {
			handleMoveEnd(evt) {
				console.log("end", evt);
			},
			handleMoveStart({ oldIndex }) {
				console.log("start", oldIndex, this.basicComponents);
			},
			handleMove() {
				return true;
			},
			showCode() {
				let el = this.$refs.WidgetForm.$el;
				const code = genCode(el);
				this.code = code;
				this.show = true;
			},
		},
	};
</script>

<style lang="less" scoped>
	h1 {
		text-align: center;
	}
	.components-list {
		min-width: 280px;
		max-width: 280px;
		position: fixed;
		top: 0px;
		bottom: 0px;
		overflow-y: scroll;
		box-shadow: 0 8px 12px #ebedf0;
		padding: 20px;
		li {
			list-style: none;
			a {
				cursor: move;
				display: block;
				margin: 0;
				padding: 8px 0 8px 30px;
				color: #455a64;
				font-size: 16px;
				line-height: 28px;
				-webkit-transition: color 0.2s;
				transition: color 0.2s;
			}
			a:hover,
			a.active {
				color: #4fc08d;
			}
		}
	}
	.van-doc-nav::-webkit-scrollbar {
		width: 6px;
		height: 6px;
		background-color: transparent;
	}
	.van-doc-nav::-webkit-scrollbar-thumb {
		background-color: rgb(181, 163, 163);
		border-radius: 6px;
	}

	.main-box {
		margin: 50px;
	}
	.right-box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.codePanel {
		padding: 20px;
		width: 500px;
	}
</style>
<style>
	body {
		min-width: 1100px;
		margin: 0;
		overflow-x: auto;
		color: #323233;
		background-color: #f7f8fa;
		font-size: 16px;
		font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
			Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "miui",
			"Hiragino Sans GB", "Microsoft Yahei", sans-serif;
	}
</style>
