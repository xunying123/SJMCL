import {
  Alert,
  AlertIcon,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuSelector } from "@/components/common/menu-selector";
import {
  OptionItemGroup,
  OptionItemGroupProps,
} from "@/components/common/option-item";
import { Section } from "@/components/common/section";
import { GameSettingsGroupsProps } from "@/components/game-settings-groups";
import { useLauncherConfig } from "@/contexts/config";

const GameAdvancedSettingsGroups: React.FC<GameSettingsGroupsProps> = ({
  gameConfig,
  updateGameConfig,
}) => {
  const { t } = useTranslation();
  const { config } = useLauncherConfig();
  const appearanceConfigs = config.appearance;
  const primaryColor = appearanceConfigs.theme.primaryColor;

  const [minecraftArgument, setMinecraftArgument] = useState<string>(
    gameConfig.advanced.customCommands.minecraftArgument
  );
  const [precallCommand, setPrecallCommand] = useState<string>(
    gameConfig.advanced.customCommands.precallCommand
  );
  const [wrapperLauncher, setWrapperLauncher] = useState<string>(
    gameConfig.advanced.customCommands.wrapperLauncher
  );
  const [postExitCommand, setPostExitCommand] = useState<string>(
    gameConfig.advanced.customCommands.postExitCommand
  );
  const [args, setArgs] = useState<string>(gameConfig.advanced.jvm.args);
  const [javaPermanentGenerationSpace, setJavaPermanentGenerationSpace] =
    useState<number>(gameConfig.advanced.jvm.javaPermanentGenerationSpace);
  const [environmentVariable, setEnvironmentVariable] = useState<string>(
    gameConfig.advanced.jvm.environmentVariable
  );

  const gameFileValidatePolicies = ["disable", "normal", "full"];
  const updateGameAdvancedConfig = (key: string, value: any) => {
    updateGameConfig(`advanced.${key}`, value);
  };

  const settingGroups: OptionItemGroupProps[] = [
    {
      title: t("GameAdvancedSettingsPage.customCommands.title"),
      items: [
        {
          title: t(
            "GameAdvancedSettingsPage.customCommands.settings.minecraftArgument.title"
          ),
          children: (
            <Input
              size="xs"
              maxW={380}
              value={minecraftArgument}
              onChange={(event) => setMinecraftArgument(event.target.value)}
              onBlur={() => {
                updateGameAdvancedConfig(
                  "customCommands.minecraftArgument",
                  minecraftArgument
                );
              }}
              focusBorderColor={`${primaryColor}.500`}
              placeholder={t(
                "GameAdvancedSettingsPage.customCommands.settings.minecraftArgument.placeholder"
              )}
            />
          ),
        },
        {
          title: t(
            "GameAdvancedSettingsPage.customCommands.settings.precallCommand.title"
          ),
          children: (
            <Input
              size="xs"
              maxW={380}
              value={precallCommand}
              onChange={(event) => setPrecallCommand(event.target.value)}
              onBlur={() => {
                updateGameAdvancedConfig(
                  "customCommands.precallCommand",
                  precallCommand
                );
              }}
              focusBorderColor={`${primaryColor}.500`}
              placeholder={t(
                "GameAdvancedSettingsPage.customCommands.settings.precallCommand.placeholder"
              )}
            />
          ),
        },
        {
          title: t(
            "GameAdvancedSettingsPage.customCommands.settings.wrapperLauncher.title"
          ),
          children: (
            <Input
              size="xs"
              maxW={380}
              value={wrapperLauncher}
              onChange={(event) => setWrapperLauncher(event.target.value)}
              onBlur={() => {
                updateGameAdvancedConfig(
                  "customCommands.wrapperLauncher",
                  wrapperLauncher
                );
              }}
              focusBorderColor={`${primaryColor}.500`}
              placeholder={t(
                "GameAdvancedSettingsPage.customCommands.settings.wrapperLauncher.placeholder"
              )}
            />
          ),
        },
        {
          title: t(
            "GameAdvancedSettingsPage.customCommands.settings.postExitCommand.title"
          ),
          children: (
            <Input
              size="xs"
              maxW={380}
              value={postExitCommand}
              onChange={(event) => setPostExitCommand(event.target.value)}
              onBlur={() => {
                updateGameAdvancedConfig(
                  "customCommands.postExitCommand",
                  postExitCommand
                );
              }}
              focusBorderColor={`${primaryColor}.500`}
              placeholder={t(
                "GameAdvancedSettingsPage.customCommands.settings.postExitCommand.placeholder"
              )}
            />
          ),
        },
      ],
    },
    {
      title: t("GameAdvancedSettingsPage.jvm.title"),
      items: [
        {
          title: t("GameAdvancedSettingsPage.jvm.settings.args.title"),
          children: (
            <Input
              size="xs"
              maxW={380}
              value={args}
              onChange={(event) => setArgs(event.target.value)}
              onBlur={() => {
                updateGameAdvancedConfig("jvm.args", args);
              }}
              focusBorderColor={`${primaryColor}.500`}
            />
          ),
        },
        {
          title: t(
            "GameAdvancedSettingsPage.jvm.settings.javaPermanentGenerationSpace.title"
          ),
          children: (
            <NumberInput
              size="xs"
              w={380}
              value={javaPermanentGenerationSpace}
              onChange={(value) => {
                if (!/^\d*$/.test(value)) return;
                setJavaPermanentGenerationSpace(Number(value));
              }}
              onBlur={() => {
                updateGameAdvancedConfig(
                  "jvm.javaPermanentGenerationSpace",
                  Math.min(javaPermanentGenerationSpace, 2 ** 32 - 1)
                );
              }}
              focusBorderColor={`${primaryColor}.500`}
            >
              <NumberInputField pr={0} />
            </NumberInput>
          ),
        },
        {
          title: t(
            "GameAdvancedSettingsPage.jvm.settings.environmentVariable.title"
          ),
          children: (
            <Input
              size="xs"
              maxW={380}
              value={environmentVariable}
              onChange={(event) => setEnvironmentVariable(event.target.value)}
              onBlur={() => {
                updateGameAdvancedConfig(
                  "jvm.environmentVariable",
                  environmentVariable
                );
              }}
              focusBorderColor={`${primaryColor}.500`}
            />
          ),
        },
      ],
    },
    {
      title: t("GameAdvancedSettingsPage.workaround.title"),
      items: [
        {
          title: t(
            "GameAdvancedSettingsPage.workaround.settings.gameFileValidatePolicy.title"
          ),
          children: (
            <HStack>
              <MenuSelector
                options={gameFileValidatePolicies.map((type) => ({
                  value: type,
                  label: t(
                    `GameAdvancedSettingsPage.workaround.settings.gameFileValidatePolicy.${type}`
                  ),
                }))}
                value={gameConfig.advanced.workaround.gameFileValidatePolicy}
                onSelect={(val) => {
                  updateGameAdvancedConfig(
                    "workaround.gameFileValidatePolicy",
                    val
                  );
                }}
              />
            </HStack>
          ),
        },
        {
          title: t("GameAdvancedSettingsPage.workaround.settings.noJvmArgs"),
          children: (
            <Switch
              colorScheme={primaryColor}
              isChecked={gameConfig.advanced.workaround.noJvmArgs}
              onChange={(event) => {
                updateGameAdvancedConfig(
                  "workaround.noJvmArgs",
                  event.target.checked
                );
              }}
            />
          ),
        },
        {
          title: t(
            "GameAdvancedSettingsPage.workaround.settings.dontCheckJvmValidity.title"
          ),
          children: (
            <Switch
              colorScheme={primaryColor}
              isChecked={gameConfig.advanced.workaround.dontCheckJvmValidity}
              onChange={(event) => {
                updateGameAdvancedConfig(
                  "workaround.dontCheckJvmValidity",
                  event.target.checked
                );
              }}
            />
          ),
        },
        {
          title: t(
            "GameAdvancedSettingsPage.workaround.settings.dontPatchNatives.title"
          ),
          children: (
            <Switch
              colorScheme={primaryColor}
              isChecked={gameConfig.advanced.workaround.dontPatchNatives}
              onChange={(event) => {
                updateGameAdvancedConfig(
                  "workaround.dontPatchNatives",
                  event.target.checked
                );
              }}
            />
          ),
        },
        ...(config.basicInfo.platform === "linux"
          ? [
              {
                title: t(
                  "GameAdvancedSettingsPage.workaround.settings.useNativeGlfw.title"
                ),
                children: (
                  <Switch
                    colorScheme={primaryColor}
                    isChecked={gameConfig.advanced.workaround.useNativeGlfw}
                    onChange={(event) => {
                      updateGameAdvancedConfig(
                        "workaround.useNativeGlfw",
                        event.target.checked
                      );
                    }}
                  />
                ),
              },
              {
                title: t(
                  "GameAdvancedSettingsPage.workaround.settings.useNativeOpenal.title"
                ),
                children: (
                  <Switch
                    colorScheme={primaryColor}
                    isChecked={gameConfig.advanced.workaround.useNativeOpenal}
                    onChange={(event) => {
                      updateGameAdvancedConfig(
                        "workaround.useNativeOpenal",
                        event.target.checked
                      );
                    }}
                  />
                ),
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <Section
      // className="content-full-y"
      title={t("GameAdvancedSettingsPage.title")}
      withBackButton
    >
      <VStack overflow="auto" align="stretch" spacing={4} flex="1">
        <Alert status="warning" fontSize="xs-sm" borderRadius="md">
          <AlertIcon />
          {t("GameAdvancedSettingsPage.topWarning")}
        </Alert>
        {settingGroups.map((group, index) => (
          <OptionItemGroup
            title={group.title}
            items={group.items}
            key={index}
          />
        ))}
      </VStack>
    </Section>
  );
};

export default GameAdvancedSettingsGroups;
