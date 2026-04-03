local foTo = 0
function FadeOutWithTimeout(time, timeOut)
    DoScreenFadeOut(time or 500)
    foTo = 0
    while IsScreenFadingOut() and foTo < (timeOut or 3000) do
        foTo += 1
        Wait(1)
    end
end

local fiTo = 0
function FadeInWithTimeout(time, timeOut)
    DoScreenFadeIn(time or 500)
    fiTo = 0
    while IsScreenFadingIn() and fiTo < (timeOut or 3000) do
        fiTo += 1
        Wait(1)
    end
end

Spawn = {
    Choosing = true,
    Cam = nil,
    InitCamera = function(self)
        TransitionFromBlurred(0)
        DoScreenFadeOut(500)
        self.Cam = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', 600.1, 507.49, 644.86, 10.76, 0.00, 0.00, 100.00, false, 0)
        SetCamUseShallowDofMode(self.Cam, false)
        SetCamActiveWithInterp(self.Cam, true, 900, true, true)
        RenderScriptCams(true, false, 1, true, true)
        DisplayRadar(false)
    end,
    Init = function(self)
        if not IsScreenFadedOut() then
		    FadeOutWithTimeout(500)
	    end
        local ped = PlayerPedId()
--      ShutdownLoadingScreenNui()
        SetEntityCoords(ped, 600.1, 507.49, 644.86)
        FreezeEntityPosition(ped, true)
        SetEntityVisible(ped, false)
        DoScreenFadeIn(500)
        while not IsScreenFadingIn() do
		    Wait(10)
	    end
        FadeInWithTimeout(500)
        Wait(500) -- Why the fuck does NUI just not do this without a wait here???
        SetNuiFocus(true, true)
        SendNUIMessage({ type = 'APP_SHOW' })
    end,
    SpawnToWorld = function(self, data, cb)
        FadeOutWithTimeout(500)

        local player = PlayerPedId()
        SetTimecycleModifier('default')

        local model = `mp_f_freemode_01`
        if tonumber(data.Gender) == 0 then
            model = `mp_m_freemode_01`
        end

        RequestModel(model)

        while not HasModelLoaded(model) do
          Wait(500)
        end
        SetPlayerModel(PlayerId(), model)
        player = PlayerPedId()
        SetPedDefaultComponentVariation(player)
        SetEntityAsMissionEntity(player, true, true)
        SetModelAsNoLongerNeeded(model)

        while not IsEntityFocus(player) do
		    ClearFocus()
		    Wait(1)
	    end

        Wait(300)

        DestroyAllCams(true)
        RenderScriptCams(false, true, 1, true, true)
        FreezeEntityPosition(player, false)

        NetworkSetEntityInvisibleToNetwork(player, false)
        SetEntityVisible(player, true)
        FreezeEntityPosition(player, false)

        self.Cam = nil

        SetPlayerInvincible(PlayerId(), false)
        SetCanAttackFriendly(player, true, true)
        NetworkSetFriendlyFireOption(true)

        SetEntityMaxHealth(PlayerPedId(), 200)
        SetEntityHealth(PlayerPedId(), data.HP > 100 and data.HP or 200)
        DisplayHud(true)

        if data.action ~= nil then
            TriggerEvent(data.action, data.data)
        else
            SetEntityCoords(player, data.spawn.location.x, data.spawn.location.y, data.spawn.location.z)
            FadeInWithTimeout(500)
        end

        SetFocusEntity(PlayerPedId())

        LocalPlayer.state:set('ped', player, true)

        SetNuiFocus(false)

        TransitionFromBlurred(500)
        cb()
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['mythic-base']:RegisterComponent('Spawn', Spawn)
end)