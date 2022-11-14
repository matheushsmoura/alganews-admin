import { User } from 'danielbonifacio-sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import * as UserActions from '../store/User.reducer';

export default function useUsers() {
  const dispatch = useDispatch();

  const users = useSelector(
    (state: RootState) => state.user.list
  );
  const editors = useSelector((state: RootState) =>
    state.user.list.filter((user) => user.role === 'EDITOR')
  );
  const fetching = useSelector(
    (state: RootState) => state.user.fetching
  );

  const fetchUsers = useCallback(() => {
    //@ts-expect-error
    dispatch(UserActions.getAllUsers());
  }, [dispatch]);

  const toggleUserStatus = useCallback(
    async (user: User.Detailed | User.Summary) => {
      //@ts-expect-error
      await dispatch(UserActions.toggleUserStatus(user));
      //@ts-expect-error
      dispatch(UserActions.getAllUsers());
    },
    [dispatch]
  );

  return {
    fetchUsers,
    users,
    editors,
    fetching,
    toggleUserStatus,
  };
}
