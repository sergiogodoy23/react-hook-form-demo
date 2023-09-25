import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm();

  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    //antes de enviar
    //fetch
    alert('enviando datos...')
    reset()
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          {...register("nombre", {
            required: {
              value: true,
              message: "Nombre es requerido",
            },
            minLength: {
              value: 2,
              message: "Nombre debe tener al menos 2 caracteres",
            },
            maxLength: {
              value: 20,
              message: "Nombre debe tener maximo 20 caracteres",
            },
          })}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="correo"
          {...register("correo", {
            required: {
              value: true,
              message: "Correo es requerido",
            },
            //pattern es para agregar un regex
            pattern: {
              value:
                /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/,
              message: "Correo no valido",
            },
          })}
        />
        {errors.correo && <span>{errors.correo.message}</span>}

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password es requerido",
            },
            minLength: {
              value: 6,
              message: "Password debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <label> repite Contraseña:</label>
        <input
          type="password"
          name="password"
          {...register("confirmarPassword", {
            required: {
              value: true,
              message: "Confirmar Password es requerido",
            },
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmarPassword && (
          <span>{errors.confirmarPassword.message}</span>
        )}

        <label>fecha de nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          {...register("fechaNacimiento", {
            required: {
              value: true,
              message: "Fecha de nacimiento es requerida",
            },
            validate: (value) => {
              const fechaNacimiento = new Date(value);
              const fechaActual = new Date();
              const edad =
                fechaActual.getFullYear() - fechaNacimiento.getFullYear();

              return edad >= 18 || "Debe ser mayor de edad";
            },
          })}
        />
        {errors.fechaNacimiento && (
          <span>{errors.fechaNacimiento.message}</span>
        )}

        <label>Pais:</label>
        <select name="pais" id="pais" {...register("pais")}>
          <option value="mx">mexico</option>
          <option value="co">colombia</option>
          <option value="ar">argentina</option>
        </select>

        {watch("pais") === "ar" && (
          <>
            <input
              type="text"
              placeholder="Provincia"
              {...register("provincia", {
                required: {
                  value: true,
                  message: "Provincia es requerida"
                }
              })}
            />
            {
              errors.provincia && <span>{errors.provincia.message}</span>
            }
          </>
        )}

        <label htmlFor="foto">Foto de perfil</label>
        <input type="file" onChange={(e) => {
          console.log(e.target.files[0])
          setValue('fotoDelUsuario', e.target.files[0].name)
        }} />

        <label>Acepto los terminos y condiciones</label>
        <input
          type="checkbox"
          name="aceptaTerminos"
          {...register("terminos", {
            required: {
              value: true,
              message: "debe aceptar terminos y condiciones"
            }
          })}
        />
        {
              errors.terminos && <span>{errors.terminos.message}</span>
            }

        <button>enviar</button>

        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </>
  );
}

export default App;
