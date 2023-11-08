import * as yup from 'yup';

const schema = yup
	.object({
		cost: yup.number().default(0).positive().integer().nullable(),
		price: yup.number().default(0).positive().integer().required(), // kendi default mesajları
		stock: yup
			.number()
			.positive('pozitif olmalı')
			.integer('tam sayı olmalı')
			.default(1)
			.required('stock boş bırakılamaz'),
		name: yup
			.string()
			.default('')
			.uppercase()
			.trim()
			.required('ürün ismi boş geçilemez'),
		description: yup
			.string()
			.default('')
			.max(20, 'Maksimum 20 karakter sınırlıdır'),
	})
	.required();

export { schema };
