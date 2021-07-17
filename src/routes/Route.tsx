import { ComponentType } from 'react';
import { Redirect, Route as RouteGE, RouteProps } from 'react-router-dom';
import { AuthConsumer } from '../contexts/auth';

interface IProps extends RouteProps {
    isPrivate?: boolean;
    component: ComponentType;
}

const Route: React.FC<IProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {

    return (
        <AuthConsumer>
            {({ user }) => (
                <RouteGE
                    {...rest}
                    render={({ location }) => {
                        if (isPrivate) {
                            return user !== null ? (
                                <Component />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: '/login',
                                        state: { from: location },
                                    }}
                                />
                            )
                        }
                        return <Component />
                    }}
                />
            )}
        </AuthConsumer>
    );
};

export default Route;