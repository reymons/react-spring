// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import styles from "./../MainContent.module.scss";

// const schema = yup.object().shape({
//   model: yup
//     .string()
//     .required("Необходимо ввести модель")
//     .min("Минимальная длина - 1 символ")
//     .max("Максимальная длина - 50 символов")
//     .matches(/^\W*$/, "Необходимо ввести хотя бы 1 букву")
//     .matches(/^\s.*$/, "Название не должно начинаться с пробела")
// })

// const Cars = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(schema)
//   });

//   return (
//     <nav className={styles.contentNav}>
      
//     </nav>
//   )
// }

// export default Cars;