import { getCollection } from "astro:content";

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export const getProjects = async () => (await getCollection("projects")).sort(byOrder);
export const getServices = async () => (await getCollection("services")).sort(byOrder);
export const getTimeline = async () => (await getCollection("timeline")).sort(byOrder);
export const getSkills = async () => (await getCollection("skills")).sort(byOrder);
export const getCounters = async () => (await getCollection("counters")).sort(byOrder);
