import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import withRouter from "../../components/withRouter";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError } from '../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import { createSelector } from 'reselect';
import Logo from '../../components/Logo';

/**
 * Register component
 * @param {*} props 
 */
const Register = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    // validation
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Enter proper email').required('Required'),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: values => {
            props.registerUser(values, props.router.navigate);
        },
    });

    const selectAccount = createSelector(
        (state) => state.Auth,
        (account) => ({
            user: account.user,
            success: account.success,
            error: account.error,
        })
    );

    const { user, error, success } = useSelector(selectAccount);


    useEffect(() => {
        if (success) {
            navigate('/dashboard');
        }
    }, [dispatch, success, error, user, navigate]);

    // useEffect(() => {
    //     dispatch(apiError(""));
    // }, [dispatch]);

    document.title = "Register | Chatvia React - Responsive Bootstrap 5 Chat App"
    if (localStorage.getItem("authUser")) {
        return <Navigate to="/" />;
    }

    return (
        <React.Fragment>

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <div className="text-center mb-4">
                                <Link to="/" className="auth-logo mb-5 d-block">
                                <h2>Create New Account</h2>
                                </Link>

                                <h4>{t('Register')}</h4>
                                <p className="text-muted mb-4">{t('Get your account now')}.</p>

                            </div>

                            <Card>
                                <CardBody className="p-4">
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            formik.handleSubmit();
                                            // return false;
                                        }}
                                    >
                                        {user && user ? (
                                            <Alert color="success">
                                                Register User Successfully
                                            </Alert>
                                        ) : null}

                                        {
                                            props.error && <Alert color="danger">{props.error}</Alert>
                                        }
                                        <div className="mb-3">
                                            <Label className="form-label">{t('Name')}</Label>
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <span className="input-group-text text-muted">
                                                    <i className="ri-user-2-line"></i>
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter Name"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.name}
                                                    invalid={formik.touched.name && formik.errors.name ? true : false}
                                                />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">{t('Email')}</Label>
                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <span className="input-group-text border-light text-muted">
                                                    <i className="ri-mail-line"></i>

                                                </span>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter Email"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                    invalid={formik.touched.email && formik.errors.email ? true : false}
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>

                                        <FormGroup className="mb-4">
                                            <Label className="form-label">{t('Password')}</Label>
                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <span className="input-group-text border-light text-muted">
                                                    <i className="ri-lock-2-line"></i>
                                                </span>
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter Password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                    invalid={formik.touched.password && formik.errors.password ? true : false}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                ) : null}

                                            </InputGroup>
                                        </FormGroup>


                                        <div className="d-grid">
                                            <Button color="primary" block className=" waves-effect waves-light" type="submit">
                                                Register</Button>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <p className="text-muted mb-0">{t('By registering you agree to the Chatvia')} <Link to="#" className="text-primary">{t('Terms of Use')}</Link></p>
                                        </div>

                                    </Form>
                                </CardBody>
                            </Card>

                            <div className="mt-5 text-center">
                                <p>{t('Already have an account')} ? <Link to="login" className="font-weight-medium text-primary"> {t('Signin')} </Link> </p>
                                <p>© {new Date().getFullYear()} {t('Tamiz')}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { registerUser, apiError })(Register));