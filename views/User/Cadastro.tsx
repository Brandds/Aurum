import axios, { AxiosResponse } from "axios";
import { Formik } from "formik";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MaskedTextInput } from "react-native-mask-text";
import * as Yup from "yup";
import { DefaultButton } from "../../components/DefautlBotton";
import { Colors } from "../../styles/constants";




const initialValues = {
  nome: "",
  documento: "",
  senha: "",
  confirmarSenha: "",
  email: "",
  confirmaEmail: "",
}

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  confirmaEmail: Yup.string()
    .email("E-mail inválido")
    .oneOf([Yup.ref("email"), null], "Os e-mails não coincidem")
    .required("Confirmação de e-mail é obrigatória"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  documento: Yup.string()
    .required("CPF é obrigatório"),
})

interface UsuarioProps {
  nome: string;
  documento: string;
  senha: string;
  confirmarSenha: string;
  email: string;
  confirmaEmail: string;
}

interface UsuarioCadastro {
  nome: string;
  documento: string;
  senha: string;
  email: string;

}

const Cadastro = () => {

  const cadastrarUsuario = async (values: UsuarioProps) => {
    const url = "https://localhost:7202/api/Usuario/cadastrar"; // Para emulador Android
    const newUsuario: UsuarioCadastro = {
      nome: values.nome,
      documento: values.documento,
      senha: values.senha,
      email: values.email
    }

    console.log(newUsuario);


    try {
      const response: AxiosResponse = await axios.post(url, newUsuario, { timeout: 5000 }); // Timeout de 5 segundos
      console.log('Cadastro bem-sucedido:', response.data);
      return true;
    } catch (error) {
      // Verificando se o erro é do tipo Axios
      if (axios.isAxiosError(error)) {
        console.error('Erro de Axios:', error.message);

        // Se a resposta foi recebida, mas há um erro
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Dados da resposta:', error.response.data);

          // Diagnóstico específico para códigos de status HTTP
          if (error.response.status === 404) {
            console.error('Erro: Recurso não encontrado.');
          } else if (error.response.status === 500) {
            console.error('Erro no servidor.');
          }
        }
        // Se não há resposta (por exemplo, a requisição não foi feita)
        else if (error.request) {
          console.error('Erro na requisição:', error.request);
        }
      }
      // Se o erro não for relacionado ao Axios
      else {
        console.error('Erro não relacionado ao Axios:', error);
      }
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            cadastrarUsuario(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Cadastro</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.labelContainer}>Nome completo</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite seu nome completo"
                  onChangeText={handleChange("nome")}
                  value={values.nome}
                />
                {touched.nome && errors.email && <Text style={styles.error}>{errors.nome}</Text>}
                <Text style={styles.labelContainer}>CPF</Text>
                <MaskedTextInput
                  mask="999.999.999-99"
                  style={styles.textInput}
                  placeholder="CPF"
                  keyboardType="numeric"
                  onChangeText={(text, rawText) => {
                    handleChange("documento")(rawText); // Use o valor sem máscara no Formik
                  }}
                  value={values.documento}
                />
                {touched.documento && errors.documento && <Text style={styles.error}>{errors.documento}</Text>}
                <Text style={styles.labelContainer}>E-mail</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite seu e-mail"
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <Text style={styles.labelContainer}>Confirme o E-mail</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirme seu e-mail"
                  onChangeText={handleChange("confirmaEmail")}
                  value={values.confirmaEmail}
                />
                {touched.confirmaEmail && errors.confirmaEmail && <Text style={styles.error}>{errors.confirmaEmail}</Text>}
                <Text style={styles.labelContainer}>Senha</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Digite sua senha"
                  secureTextEntry={true}
                  onChangeText={handleChange("senha")}
                  value={values.senha}
                />
                {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
                <Text style={styles.labelContainer}>Confirme a senha</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirme sua senha"
                  secureTextEntry={true}
                  onChangeText={handleChange("confirmarSenha")}
                  value={values.confirmarSenha}
                />
                {touched.confirmarSenha && errors.confirmarSenha && <Text style={styles.error}>{errors.confirmarSenha}</Text>}
              </View>
              <DefaultButton onPress={handleSubmit} corTexto={Colors.textButton} cor={Colors.button} nome="Cadastrar" ></DefaultButton>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.fundo,
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    marginBottom: 50
  },
  title: {
    fontSize: 40,
    color: Colors.textInfo,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    textAlign: 'left',
  },
  labelContainer: {
    fontSize: 15,
    color: Colors.textInfo,
    marginTop: 20,
    width: '100%',
  },
  textInput: {
    backgroundColor: Colors.textInfo,
    width: '100%',
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: Colors.defaultText,
  },
  error: {
    color: 'red'
  },
});

export default Cadastro;