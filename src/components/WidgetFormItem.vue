<template>
	<div>
		<template v-if="el.type == 'calendar'">
			<div :data-wtype=el.type>
				<van-cell
					title="选择单个日期"
					:value="calendar.date"
					@click="calendar.show = true"
				/>
				<van-calendar
					v-model="calendar.show"
					@confirm="onConfirm"
				/>
			</div>
		</template>
		<template v-if="el.type == 'checkbox'">
			<div :data-wtype=el.type>
				<van-checkbox v-model="checkbox.checked">复选框</van-checkbox>
			</div>
		</template>
		<template v-if="el.type == 'cascader'">
			<div :data-wtype=el.type>
				<van-field
					v-model="Cascader.fieldValue"
					is-link
					readonly
					label="地区"
					placeholder="请选择所在地区"
					@click="Cascader.show = true"
				/>
				<van-popup
					v-model="Cascader.show"
					round
					position="bottom"
				>
					<van-cascader
						v-model="Cascader.cascaderValue"
						title="请选择所在地区"
						:options="Cascader.options"
						@close="Cascader.show = false"
						@finish="onFinish"
					/>
				</van-popup>
			</div>
		</template>
		<template v-if="el.type == 'datetimePicker'">
			<div :data-wtype=el.type>
				<van-datetime-picker
					v-model="datetime.currentDate"
					type="date"
					title="选择年月日"
					:min-date="datetime.minDate"
					:max-date="datetime.maxDate"
				/>
			</div>
		</template>
		<template v-if="el.type == 'field'">
			<div :data-wtype=el.type>
				<van-cell-group>
					<van-field
						v-model="field.value"
						label="文本"
						placeholder="请输入用户名"
					/>
				</van-cell-group>
			</div>
		</template>
		<template v-if="el.type == 'form'">
			<div :data-wtype=el.type>
				<van-form @submit="onSubmit">
					<van-field
						v-model="form.username"
						name="用户名"
						label="用户名"
						placeholder="用户名"
						:rules="[{ required: true, message: '请填写用户名' }]"
					/>
					<van-field
						v-model="form.password"
						type="password"
						name="密码"
						label="密码"
						placeholder="密码"
						:rules="[{ required: true, message: '请填写密码' }]"
					/>
					<div style="margin: 16px;">
						<van-button
							round
							block
							type="info"
							native-type="submit"
						>提交</van-button>
					</div>
				</van-form>
			</div>
		</template>
	</div>
</template>
<script>
	export default {
		name: "WidgetFormItem",
		props: ["el"],
		data() {
			return {
				calendar: {
					show: false,
					date: "",
				},
				checkbox: {
					checked: false,
				},
				Cascader: {
					fieldValue: "",
					cascaderValue: "",
					show: false,
					options: [
						{
							text: "浙江省",
							value: "330000",
							children: [{ text: "杭州市", value: "330100" }],
						},
						{
							text: "江苏省",
							value: "320000",
							children: [{ text: "南京市", value: "320100" }],
						},
					],
				},
				datetime: {
					minDate: new Date(2020, 0, 1),
					maxDate: new Date(2025, 10, 1),
					currentDate: new Date(2021, 0, 17),
				},
				field: {
					value: "",
				},
				form: {
					username: "",
					password: "",
				},
			};
		},
		methods: {
			formatDate(date) {
				return `${date.getMonth() + 1}/${date.getDate()}`;
			},
			onConfirm(date) {
				this.calendar.show = false;
				this.calendar.date = this.formatDate(date);
			},
			onFinish({ selectedOptions }) {
				this.Cascader.show = false;
				this.Cascader.fieldValue = selectedOptions
					.map((option) => option.text)
					.join("/");
			},
			onSubmit(values) {
				console.log("submit", values);
			},
		},
	};
</script>
<style lang="less">
</style>