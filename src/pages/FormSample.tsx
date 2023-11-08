import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { schema } from './ProductFormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, TextField } from '@mui/material';

type ProductFormState = yup.InferType<typeof schema>;

function FormSample() {
	console.log('..rendering');

	const {
		control,
		setValue, // javascript ile input değeri name göre set etmek için
		watch, // input değişimini takip eder
		handleSubmit, // formun saubmit edilmesini sağlar
		register, // input alanlarını forma register eder
		formState: { errors, isValid }, // form state hakkında bilgi verir.
	} = useForm({
		resolver: yupResolver(schema), // validation bilgilerinde ProductFormValidation dosyasında schema dan alıcak.
	});

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

				<Controller
					name="name" // ...register() yok name alanı üzerinden input değer register ediliyor.
					control={control}
					rules={{ required: true }}
					render={({ field }) => <TextField variant="outlined" />}
				/>

				{/* <input {...register('name')} /> */}
				<span>{errors.name?.message}</span>
				{/* <input>{... register("name")}</input> */}
				<br></br>
				<label>Description</label>
				<textarea rows={3} cols={100} {...register('description')} />
				<span>{errors.description?.message}</span>
				<br></br>
				<label>Price</label>
				<input type="number" {...register('price')} />
				<span>{errors.price?.message}</span>
				<br></br>
				<label>Stok</label>
				<input type="number" {...register('stock')} />
				<span>{errors.stock?.message}</span>
				<br></br>
				<input type="number" readOnly={true} {...register('cost')} />
				<br></br>
				<input type="submit" value={'kaydet'} />
			</form>
		</>
	);
}

export default FormSample;
