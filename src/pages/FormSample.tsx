import React from 'react';
import { useForm } from 'react-hook-form';

export type ProductFormState = {
	stock: number;
	name: string;
	description: string;
	price: number;
	cost: number;
};

function FormSample() {
	console.log('..rendering');

	const {
		setValue, // javascript ile input değeri name göre set etmek için
		watch, // input değişimini takip eder
		handleSubmit, // formun saubmit edilmesini sağlar
		register, // input alanlarını forma register eder
		formState: { errors, isValid }, // form state hakkında bilgi verir.
	} = useForm<ProductFormState>();

	// errors form tüm hataları bu state saklanıyor

	const price = watch('price');
	console.log('price', price);
	const stock = watch('stock');
	console.log('stock', stock);
	const cost = price * stock;

	if (!isNaN(cost)) {
		setValue('cost', cost); // calculate edilen cost değerini set ediceğiz
	}

	const onFormSubmit = (data: ProductFormState) => {
		console.log('form-data', data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<label>ProductName</label>
				<input
					{...register('name', {
						required: { value: true, message: 'name alanı boş geçilemez' },
						
					})}
				/>
				<span>{errors.name?.message}</span>
				{/* <input>{... register("name")}</input> */}
				<br></br>
				<label>Description</label>
				<textarea rows={3} cols={100} {...register('description')} />
				<br></br>
				<label>Price</label>
				<input type="number" {...register('price')} />
				<br></br>
				<label>Stok</label>
				<input type="number" {...register('stock')} />
				<br></br>
				<input type="number" readOnly={true} {...register('cost')} />
				<br></br>
				<input disabled={!isValid} type="submit" value={'kaydet'} />
			</form>
		</>
	);
}

export default FormSample;
