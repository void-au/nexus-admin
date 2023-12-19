import { IconDefinition, faBuilding, faFile, faFileAlt, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { get_connection } from "../database/database";

export interface Field {
    key: string;
    type: string;
    label: string;
}

export interface Resource {
    slug: string;
    table_name: string;
    name: string;
    icon?: IconDefinition;
    group?: string;
    description?: string;
    list_fields?: Field[];
    view_fields?: Field[];
}

export const ResourceGroups = [
    {
        name: "Users",
        icon: faUser,
    },
    {
        name: "Assets",
        icon: faFile,
    },
    {
        name: "Organisations",
        icon: faBuilding,
    }
]

export const Resources = [
    {
        slug: "users",
        table_name: "User",
        group: "Users",
        icon: faUser,
        name: "Users",
        description: "Users of the system",
        list_fields: [
      {
        key: "id",
        title: "id",
      },
      {
        key: "first_name",
        title: "First Name",
      },
      {
        key: "last_name",
        title: "Last Name"
      },
      {
        key: "email",
        title: "Email Address"
      }
      ]
    },
    {
        slug: "permissions",
        table_name: "Permission",
        group: "Users",
        icon: faKey,
        name: "Permissions",
        description: "Permissions for users",
        list_fields: [
            {
                key: "id",
                title: "ID",
            },
            {
                key: "name",
                title: "Name",
            },
            {
                key: "description",
                title: "Description",
            },
            {
                key: "created_at",
                title: "Created At",
            }
        ]
    },
    {
        slug: "organisation",
        table_name: "Organisation",
        group: "Organisations",
        icon: faBuilding,
        name: "Organisations",
        description: "Organisations in the system",
    },
    {
        slug: "assets",
        table_name: "Asset",
        group: "Assets",
        icon: faFile,
        name: "Assets",
        description: "Assets in the system",
    },
    {
        slug: "asset_types",
        table_name: "AssetType",
        group: "Assets",
        icon: faFileAlt,
        name: "Asset Types",
        description: "Types of assets",
    },
]


export const get_grouped_resources = () => {
    const groups = ResourceGroups.map(group => {
        return {
            ...group,
            resources: Resources.filter(resource => resource.group === group.name)
        }
    })

    return groups;
}


export const get_resource = (slug: string) => {
    return Resources.find(resource => resource.slug === slug);
}
