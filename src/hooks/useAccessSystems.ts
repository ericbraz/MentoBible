import RoleModel from '@/models/RoleModel'
import {
   getSystemData,
   findUserSystems,
   listSystems,
   getSystemsList,
} from '@/store/userState/userSlice'
import useUserState from './useUserState'
import SystemModel from '@/models/SystemModel'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { systemStateData } from '@/utils/authUserHelper'

export default function useAccessSystems() {
   const dispatch = useDispatch()

   const { userDataState } = useUserState()
   const { userRoleIds } = userDataState

   const accessibleSystemsObject = useSelector(getSystemData)
   const accessibleSystemsList = useSelector(getSystemsList)
   const setAccessibleSystems = async function () {
      const { systems, systemPaths } = await defineSystems()
      dispatch(findUserSystems(systemStateData(systems)))
      dispatch(listSystems(systemPaths ?? []))
   }
   async function defineSystems() {
      const roles = userRoleIds && (await RoleModel.findInArray(userRoleIds))
      const roleIds = roles?.map((role) => role.idSystem).flat()
      const systems = roleIds && (await SystemModel.findInArray(roleIds))
      const systemPaths = systems?.map((system) => system.systemPath)
      return { systems, systemPaths }
   }

   useEffect(() => {
      setAccessibleSystems()
   }, [userDataState])

   return { accessibleSystemsObject, accessibleSystemsList }
}
