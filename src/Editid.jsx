import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";


const formValidationSchema = yup.object({
  id: yup.number().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
});

export function Editid() {
  const { id } = useParams();

  const [list, setlist] = useState(null);

  useEffect(() => {
    fetch(`https://63f0967c5b7cf4107e22d318.mockapi.io/userid/${id}`)
      .then((data) => data.json())
      .then((mvs) => setlist(mvs));
  }, []);

  console.log(list);
  return list ? <Editform list={list} /> : <h2>loading..</h2>;
}


function Editform({ list }) {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: list.id,
      username: list.username,
      email: list.email
    },
    validationSchema: formValidationSchema,
    onSubmit: (newupdate) => {
      updateddata(newupdate);
    }
  });

  const updateddata = (newupdate) => {
    console.log(newupdate);

    fetch(`https://63f0967c5b7cf4107e22d318.mockapi.io/userid/${list.id}`, {
      method: "PUT",
      body: JSON.stringify(newupdate),
      headers: {
        "content-type": "application/json"
      }
    });
    navigate("/");
  };


  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="id"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.id}
      ></input>
 {formik.errors.id && formik.touched.id ? (<div>{formik.errors.id }</div>) : null}

<br></br>

      <input
        name="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        type="text"></input>
{formik.errors.username && formik.touched.username ? (<div>{formik.errors.username }</div>) : null}

<br></br>

      <input
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        type='email'>
        </input>
        {formik.errors.email && formik.touched.email ? (<div>{formik.errors.email }</div>) : null}

      <button type="submit">save</button>
    </form>
  );
}



